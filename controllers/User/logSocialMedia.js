// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Función para manejar el inicio de sesión social
async function socialLogin(provider) {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Obtener referencia del documento del usuario en Firestore
        const userRef = doc(db, "users", user.email);
        const userSnap = await getDoc(userRef);

        // Si el usuario no existe en Firestore, guardarlo
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                firstName: user.displayName.split(" ")[0] || "Usuario",
                lastName: user.displayName.split(" ")[1] || "",
                email: user.email,
                level: 1,
                points: 0
            });
        }

        // Guardar los datos en localStorage para el dashboard
        localStorage.setItem("userData", JSON.stringify({ 
            firstName: user.displayName.split(" ")[0] || "Usuario",
            lastName: user.displayName.split(" ")[1] || "",
            email: user.email,
            level: userSnap.exists() ? userSnap.data().level : 1,
            points: userSnap.exists() ? userSnap.data().points : 0,
            profilePicture: user.photoURL || ""
        }));

        alert(`Bienvenido, ${user.displayName}!`);
        window.location.href = "/pages/login.html";
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        alert(`Error: ${error.message}`);
    }
}

// Eventos para los botones de Google y Facebook
document.querySelector(".social-icons a:nth-child(1)").addEventListener("click", (e) => {
    e.preventDefault();
    socialLogin(facebookProvider);
});

document.querySelector(".social-icons a:nth-child(2)").addEventListener("click", (e) => {
    e.preventDefault();
    socialLogin(googleProvider);
});