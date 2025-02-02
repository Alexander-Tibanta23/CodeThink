//import { updateUserScore } from "/DB/datos/updateUserData.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCpdOhhe7xj6vODNngBBWfLboNKdzOlToE",
    authDomain: "codethink-e99d1.firebaseapp.com",
    projectId: "codethink-e99d1",
    storageBucket: "codethink-e99d1.firebasestorage.app",
    messagingSenderId: "696144227588",
    appId: "1:696144227588:web:0b9fc035d20107ff48f451"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateUserScore(email, newPoints) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        console.error("User not found!");
        return;
    }

    let userData = userDoc.data();
    let updatedPoints = userData.points + newPoints;
    let updatedLevel = userData.level;

    // Definir lógica para subir de nivel
    if (updatedLevel <= 10 && updatedPoints >= 1000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 1000)); // Máximo 50 niveles
        updatedPoints = updatedPoints % 1000; // Restante de los puntos
    } else if (updatedLevel > 10 && updatedPoints >= 2000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 2000));
        updatedPoints = updatedPoints % 2000;
    }

    // Actualizar en Firestore
    await updateDoc(userRef, {
        points: updatedPoints,
        level: updatedLevel
    });

    console.log(`User updated: Level ${updatedLevel}, Points ${updatedPoints}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
        console.error("Game ID not found");
        return;
    }

    fetch("/DB/pruebas/games.json")
        .then(response => response.json())
        .then(games => {
            const game = games.find(g => g.id === gameId);
            if (!game || !game.questions || game.questions.length === 0) {
                console.error("No questions found for this game");
                return;
            }

            let currentQuestionIndex = 0;
            const totalQuestions = game.questions.length;

            // Elementos de la página
            const titleQuestion = document.getElementById("titleQuestion");
            const imageQuestion = document.getElementById("imageQuestion");
            const options = document.querySelectorAll(".option");
            const progressBar = document.getElementById("progress");
            const scoreDisplay = document.getElementById("score");
            const timeDisplay = document.getElementById("time");
            const puntuacion = document.getElementById("puntuation");

            let score = 0;
            let timeLeft;
            let timer;

            function loadQuestion(index) {
                const question = game.questions[index];

                titleQuestion.textContent = question.titleQuestion;
                imageQuestion.src = question.imageQuestion;
                options.forEach((button, i) => {
                    button.textContent = `${String.fromCharCode(65 + i)}) ${question.options[i]}`;
                    button.onclick = () => checkAnswer(i, question.correctOption);
                });

                timeLeft = question.time;
                updateTimer();
                puntuacion.textContent = `${index + 1} / ${totalQuestions}`;
            }

            function checkAnswer(selectedIndex, correctIndex) {
                if (selectedIndex === correctIndex) {
                    score += game.questions[currentQuestionIndex].score;
                }

                currentQuestionIndex++;

                if (currentQuestionIndex < totalQuestions) {
                    loadQuestion(currentQuestionIndex);
                } else {
                    endGame();
                }

                scoreDisplay.textContent = `${score} points`;
            }

            function updateTimer() {
                clearInterval(timer);
                progressBar.style.width = "100%";
                timeDisplay.textContent = `${timeLeft}s`;

                timer = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        timeDisplay.textContent = `${timeLeft}s`;
                        progressBar.style.width = `${(timeLeft / game.questions[currentQuestionIndex].time) * 100}%`;
                    } else {
                        clearInterval(timer);
                        checkAnswer(-1, game.questions[currentQuestionIndex].correctOption); // Pasar a la siguiente pregunta si se acaba el tiempo
                    }
                }, 1000);
            }

            async function endGame() {
                alert(`Game Over! Total Score: ${score}`);

                // Obtener datos del usuario desde localStorage
                const userData = JSON.parse(localStorage.getItem("userData"));
                if (userData && userData.email) {
                    await updateUserScore(userData.email, score); // Actualiza Firestore
                }

                window.location.href = "/pages/dashboard.html"; // Redirigir al dashboard
            }

            // Cargar la primera pregunta
            loadQuestion(0);
        })
        .catch(error => console.error("Error loading game data:", error));

    // Botón de regreso
    document.getElementById("back-button").addEventListener("click", () => {
        window.history.back();
    });
});