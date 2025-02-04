document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.querySelector(".games-area-wrapper");
    
    fetch("/DB/pruebas/random/extraGames.json") // Cargar JSON
        .then(response => response.json())
        .then(games => {
            games.forEach(game => {
                // Crear el div para cada juego
                const gameDiv = document.createElement("div");
                gameDiv.classList.add("games-row");
                gameDiv.id = game.id;
                
                // Agregar contenido dinámico
                gameDiv.innerHTML = `
                    <button class="cell-more-button"></button>
                    <div class="games-cell image">
                        <img src="${game.image}" alt="Game Image">
                        <span>${game.title}</span>
                    </div>
                    <div class="games-cell category"><span class="cell-label">Type:</span>${game.type}</div>
                    <div class="games-cell status-cell">
                        <span class="cell-label">Status:</span>
                        <span class="status ${game.status === 'Active' ? 'active' : 'disabled'}">${game.status}</span>
                    </div>
                    <div class="games-cell cattegory"><span class="cell-label">Difficulty:</span>${game.difficulty}</div>
                    <div class="games-cell feedback"><span class="cell-label">Feedback:</span>${game.feedback}</div>
                    <div class="games-cell time"><span class="cell-label">Duration:</span>${game.duration}</div>
                `;

                // Agregar evento de clic para redirigir a test.html con el ID del juego
                gameDiv.addEventListener("click", () => {
                    window.location.href = `test.html?id=${game.id}`;
                });

                // Agregar el juego al contenedor
                gamesContainer.appendChild(gameDiv);
            });
        })
        .catch(error => console.error("Error loading games:", error));
});