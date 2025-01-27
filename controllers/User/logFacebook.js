// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Proveedor de Facebook
const provider = new FacebookAuthProvider();

// Manejo del inicio de sesión con Facebook
document.querySelector(".social-icons a:nth-child(1)").addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("User logged in with Facebook:", user);
        alert(`Welcome back, ${user.displayName}!`);
        window.location.href = "/pages/dashboard.html";
    } catch (error) {
        console.error("Error during Facebook login:", error);
        alert(`Error: ${error.message}`);
    }
});