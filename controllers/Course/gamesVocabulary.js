document.addEventListener("DOMContentLoaded", () => {

    const gamesContainer = document.querySelector(".games-area-wrapper");

    // Obtener el topic desde la URL
    const params = new URLSearchParams(window.location.search);
    const topicName = params.get("topic");

    if (!topicName) {
        console.error("No topic specified.");
        return;
    }

    // Cargar topics para obtener la info del topic seleccionado
    fetch('/DB/pruebas/vocabulary/topicVocabulary.json')
        .then(response => response.json())
        .then(topics => {
            const topic = topics.find(t => t.id === topicName);
            if (!topic) {
                console.error("Topic not found.");
                return;
            }

            // Cargar juegos
            return fetch("/DB/pruebas/vocabulary/gamesVocabulary.json").then(response => response.json())
                .then(games => {
                    let totalDuration = 0;
                    let totalPoints = 0;
                    let countGames = 0;

                    games.forEach(game => {
                        if (topic.games.includes(game.id)) { // Filtrar juegos del topic
                            countGames++;
                            totalDuration += parseInt(game.duration);
                            totalPoints += parseInt(game.points);

                            const gameDiv = document.createElement("div");
                            gameDiv.classList.add("games-row");
                            gameDiv.id = game.id;
                            gameDiv.tabIndex = 0;

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

                            // Redirigir a test.html con click o Enter
                            const navigateToGame = () => {
                                window.location.href = `testVocabulary.html?id=${game.id}`;
                            };

                            gameDiv.addEventListener("click", navigateToGame);
                            gameDiv.addEventListener("keydown", (event) => {
                                if (event.key === "Enter") {
                                    navigateToGame();
                                }
                            });

                            gamesContainer.appendChild(gameDiv);
                        }
                    });
                });
        })
        .catch(error => console.error("Error loading topics or games:", error));
});