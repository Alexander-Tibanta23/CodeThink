document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        document.getElementById("profileName").textContent = `${userData.firstName} ${userData.lastName}`;
        
        document.getElementById("level-number").textContent = userData.level;
        
        const progressBar = document.getElementById("level-progress");
        progressBar.style.width = `${(userData.points % 100)}%`;

        // Lista de imágenes disponibles en la carpeta
        const imageList = [
            "Perfil1.jpeg",
            "Perfil2.jpeg",
            "Perfil3.jpeg",
            "Perfil4.jpeg",
            "Perfil5.jpeg",
            "Perfil6.jpeg",
            "Perfil7.jpeg",
            "Perfil8.jpeg",
            "Perfil9.jpg", 
            "Perfil10.png",
            "Perfil11.png",
            "Perfil12.png",
            "Perfil13.png"
        ];

        // Seleccionar una imagen aleatoria
        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
        const profileImage = `/assets/img/portraits/${randomImage}`;

        document.getElementById("imagenPerfil").src = profileImage;
        
    } else {
        console.error("No se encontraron datos del usuario.");
    }
});
