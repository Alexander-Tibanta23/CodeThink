import app from './app.js';
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await signOut(auth);

        localStorage.removeItem("userData");

        window.location.href = "/index.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un error al cerrar sesión. Inténtalo nuevamente.");
    }
});