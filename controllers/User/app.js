import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCpdOhhe7xj6vODNngBBWfLboNKdzOlToE",
    authDomain: "codethink-e99d1.firebaseapp.com",
    projectId: "codethink-e99d1",
    storageBucket: "codethink-e99d1.firebasestorage.app",
    messagingSenderId: "696144227588",
    appId: "1:696144227588:web:0b9fc035d20107ff48f451"
};

// Inicializar Firebase y exportarlo
const app = initializeApp(firebaseConfig);
export default app;