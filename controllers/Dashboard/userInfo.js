// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const auth = getAuth(app);

// Verifica el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está logueado, obtener la información
        const userName = user.displayName || "Usuario Anónimo"; // Si no tiene nombre, poner un valor por defecto
        const userEmail = user.email; // Obtén el correo electrónico
        const userPhotoURL = user.photoURL || getRandomProfilePicture(); // Usa una foto aleatoria si no tiene foto

        // Mostrar la información en el dashboard
        document.querySelector(".account-info-name").textContent = userName; // Cambiar el nombre
        document.querySelector(".account-info-picture img").src = userPhotoURL; // Cambiar la foto de perfil
    } else {
        // Si no hay usuario autenticado, redirigir al login o mostrar mensaje
        window.location.href = "/pages/login.html"; // O cualquier página de redirección
    }
});

// Función para obtener una foto aleatoria desde la carpeta de tu proyecto
function getRandomProfilePicture() {
    const defaultPhotos = [
        "assets/img/portraits/Perfil1.jpeg",
        "assets/img/portraits/Perfil2.jpeg",
        "assets/img/portraits/Perfil3.jpeg",
        "assets/img/portraits/Perfil4.jpeg",
        "assets/img/portraits/Perfil5.jpeg",
        "assets/img/portraits/Perfil6.jpeg",
        "assets/img/portraits/Perfil7.jpeg",
        "assets/img/portraits/Perfil8.jpeg",
        "assets/img/portraits/Perfil9.jpg",
        "assets/img/portraits/Perfil10.png",
        "assets/img/portraits/Perfil11.png",
        "assets/img/portraits/Perfil12.png",
        "assets/img/portraits/Perfil13.png"
    ];
    const randomIndex = Math.floor(Math.random() * defaultPhotos.length);
    return defaultPhotos[randomIndex];
}