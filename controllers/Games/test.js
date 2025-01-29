document.addEventListener("DOMContentLoaded", () => {
    const titleGame = document.getElementById("titleGame");
    const imageGame = document.getElementById("imageGame");
    const difficulty = document.getElementById("difficulty");
    const timeGame = document.getElementById("timeGame");
    const points = document.getElementById("points");
    const descriptionGame = document.getElementById("descriptionGame");
    const instructionsList = document.querySelector(".instructions ol");
    const botonJuego = document.getElementById("botonJuego");

    // Obtener el ID del juego desde la URL o localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id") || localStorage.getItem("selectedGame");

    fetch("/DB/pruebas/games.json")
        .then(response => response.json())
        .then(games => {
            const game = games.find(g => g.id === gameId);

            if (game) {
                titleGame.textContent = game.title;
                imageGame.src = game.image;
                difficulty.innerHTML = `<span>Difficulty:</span> ${game.difficulty}`;
                timeGame.innerHTML = `<span>Time:</span> ${game.duration}`;
                points.innerHTML = `<span>Score:</span> ${game.points || "N/A"} points`;
                descriptionGame.textContent = game.descriptionGame;

                // Renderizar instrucciones dinámicamente
                instructionsList.innerHTML = ""; 
                game.instructions.forEach(instruction => {
                    const li = document.createElement("li");
                    li.textContent = instruction;
                    instructionsList.appendChild(li);
                });

                // Redirigir al hacer clic en el botón "Play ▶️"
                botonJuego.addEventListener("click", () => {
                    window.location.href = `multipleChoiceBase.html?id=${game.id}`;
                });
            } else {
                console.error("Game not found");
            }
        })
        .catch(error => console.error("Error loading game details:", error));
});