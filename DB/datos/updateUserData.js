import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

async function updateUserScore(email, newPoints) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        console.error("User not found!");
        return;
    }

    let userData = userDoc.data();
    let updatedPoints = userData.points + newPoints;
    let updatedLevel = userData.level;

    // Definir lógica para subir de nivel
    if (updatedLevel <= 10 && updatedPoints >= 1000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 1000)); // Máximo 50 niveles
        updatedPoints = updatedPoints % 1000; // Restante de los puntos
    } else if (updatedLevel > 10 && updatedPoints >= 2000) {
        updatedLevel = Math.min(50, updatedLevel + Math.floor(updatedPoints / 2000));
        updatedPoints = updatedPoints % 2000;
    }

    // Actualizar en Firestore
    await updateDoc(userRef, {
        points: updatedPoints,
        level: updatedLevel
    });

    console.log(`User updated: Level ${updatedLevel}, Points ${updatedPoints}`);
}