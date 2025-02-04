document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('slider');

    // Cargar topics desde el archivo JSON
    fetch('/DB/pruebas/grammar/topicGrammar.json')
        .then(response => response.json())
        .then(topics => {
            topics.forEach(topic => {
                // Crear un card por cada topic
                const card = document.createElement('div');
                card.classList.add('card');
                card.id = 'cardTopic';

                card.innerHTML = `
                    <img id="imagenTopic" src="${topic.image}" alt="Imagen">
                    <div class="content">
                        <div class="title" id="tituloTopic">${topic.title}</div>
                        <p id="descripcionTopic">${topic.description}</p>
                        <div class="stats-container">
                            <div class="stat-item">
                                <div class="stat-box">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                                    </svg>
                                </div>
                                <div class="stat-text">
                                    <span class="stat-value" id="numeroPruebas">10</span>
                                    <span class="stat-label">Quiz</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-box">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 8v5h5v-2h-3V8h-2zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                    </svg>
                                </div>
                                <div class="stat-text">
                                    <span class="stat-value" id="tiempoTotalTopic">27min</span>
                                    <span class="stat-label">Time</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-box">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </div>
                                <div class="stat-text">
                                    <span class="stat-value" id="puntosTotalesTopic">4000</span>
                                    <span class="stat-label">Points</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="circle-wrap">
                        <div class="circle">
                            <div class="inside-circle">75%</div>
                        </div>
                    </div>
                `;

                // Agregar el card a la sección de slider
                slider.appendChild(card);

                // Evento de clic para redirigir a games.html con el nombre del topic
                card.addEventListener("click", () => {
                    window.location.href = `gamesGrammar.html?topic=${encodeURIComponent(topic.id)}`;
                });
            });
        })
        .catch(error => console.error("Error cargando los topics:", error));
});
