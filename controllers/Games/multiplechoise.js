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
                    alert(`Game Over! Total Score: ${score}`);
                    window.location.href = "/pages/dashboard.html"; // Redirigir al finalizar
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

            // Cargar la primera pregunta
            loadQuestion(0);
        })
        .catch(error => console.error("Error loading game data:", error));

    // Botón de regreso
    document.getElementById("back-button").addEventListener("click", () => {
        window.history.back();
    });
});