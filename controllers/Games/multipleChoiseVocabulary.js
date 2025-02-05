import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Sonidos
const sounds = {
    start: new Audio("/assets/sounds/background-music.mp3"),
    correct: new Audio("/assets/sounds/correct.mp3"),
    wrong: new Audio("/assets/sounds/wrong.mp3"),
    end: new Audio("/assets/sounds/fireworks.mp3")
};

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

    if (updatedLevel <= 10 && updatedPoints >= 1000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 1000));
        updatedPoints = updatedPoints % 1000;
    } else if (updatedLevel > 10 && updatedPoints >= 2000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 2000));
        updatedPoints = updatedPoints % 2000;
    }

    await updateDoc(userRef, { points: updatedPoints, level: updatedLevel });
    console.log(`User updated: Level ${updatedLevel}, Points ${updatedPoints}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
        console.error("Game ID not found");
        return;
    }

    fetch("/DB/pruebas/vocabulary/gamesVocabulary.json")
        .then(response => response.json())
        .then(games => {
            const game = games.find(g => g.id === gameId);
            if (!game || !game.questions || game.questions.length === 0) {
                console.error("No questions found for this game");
                return;
            }

            let currentQuestionIndex = 0;
            const totalQuestions = game.questions.length;

            const titleQuestion = document.getElementById("titleQuestion");
            const imageQuestion = document.getElementById("imageQuestion");
            const options = document.querySelectorAll(".option");
            const progressBar = document.getElementById("progress");
            const scoreDisplay = document.getElementById("score");
            const timeDisplay = document.getElementById("time");
            const puntuacion = document.getElementById("puntuation");

            let score = 0;
            let correctAnswers = 0;
            let timeLeft;
            let timer;

            // Iniciar sonido del juego
            sounds.start.play();

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
                    correctAnswers++;
                    sounds.correct.play();
                } else {
                    sounds.wrong.play();
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
                        checkAnswer(-1, game.questions[currentQuestionIndex].correctOption);
                    }
                }, 1000);
            }

            async function endGame() {
                let finalSound;

                if (correctAnswers === totalQuestions) {
                    finalSound = sounds.end;  // Fuegos artificiales
                } else if (correctAnswers / totalQuestions >= 0.7) {
                    finalSound = new Audio("/assets/sounds/celebration.mp3"); // Celebración
                } else if (correctAnswers / totalQuestions >= 0.4) {
                    finalSound = new Audio("/assets/sounds/motivation.mp3"); // Motivación
                } else {
                    finalSound = new Audio("/assets/sounds/try-again.mp3"); // Sonido de mejora
                }

                finalSound.play();

                const phrases = [
                    "You can do better!",   // 0-20% respuestas correctas
                    "Keep practicing!",     // 21-40% respuestas correctas
                    "Nice effort!",         // 41-60% respuestas correctas
                    "Great job!",           // 61-80% respuestas correctas
                    "Excellent work!",      // 81-99% respuestas correctas
                    "Perfect! Amazing!"     // 100% respuestas correctas
                ];
                const phraseIndex = Math.min(phrases.length - 1, Math.floor((correctAnswers / totalQuestions) * phrases.length));
                const finalPhrase = phrases[phraseIndex] || "Well done!";

                const popup = document.createElement("div");
                popup.innerHTML = `
                    <div id="resultPopup" class="popup">
                        <h2>Game Over!</h2>
                        <p>Total Score: ${score}</p>
                        <p>${finalPhrase}</p>
                        <button id="dashboardBtn">Go to Dashboard</button>
                    </div>
                `;

                document.body.appendChild(popup);

                // Si respondió bien la mayoría, mostrar fuegos artificiales
                if (correctAnswers == totalQuestions >= 0.7) {
                    const fireworks = document.createElement("gif");
                    fireworks.src = "/images/fireworks.gif";
                    fireworks.classList.add("fireworks");
                    popup.appendChild(fireworks);

                    setTimeout(() => {
                        fireworks.remove();
                    }, 8000);
                }

                document.getElementById("dashboardBtn").addEventListener("click", () => {
                    window.location.href = "/pages/dashboard.html";
                });

                // Guardar puntaje en la base de datos
                const userData = JSON.parse(localStorage.getItem("userData"));
                if (userData && userData.email) {
                    await updateUserScore(userData.email, score);
                }
            }

            loadQuestion(0);
        })
        .catch(error => console.error("Error loading game data:", error));

    document.getElementById("back-button").addEventListener("click", () => {
        window.history.back();
    });
});