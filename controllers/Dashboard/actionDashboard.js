import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

async function loadUserData() {
  // Obtener datos del usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.email) {
    console.error("No user logged in!");
    return;
  }

  // Referencia a Firestore
  const userRef = doc(db, "users", userData.email);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.error("User data not found in Firestore");
    return;
  }

  // Datos del usuario
  const user = userDoc.data();
  const userLevel = user.level;
  const userPoints = user.points;

  // Actualizar el nivel en el dashboard
  document.getElementById("level-number").textContent = userLevel;

  // Calcular el progreso dentro del nivel (si nivel <= 10, cada 1000 pts sube de nivel, si >10, cada 2000 pts)
  let pointsRequired = userLevel <= 10 ? 1000 : 2000;
  let progressPercentage = (userPoints / pointsRequired) * 100;

  // Asegurar que el porcentaje no sea mayor a 100%
  progressPercentage = Math.min(progressPercentage, 100);

  // Actualizar la barra de progreso
  const progressBar = document.getElementById("level-progress");
  progressBar.style.width = `${progressPercentage}%`;
}

// Ejecutar la función cuando la página cargue
document.addEventListener("DOMContentLoaded", loadUserData);

document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".games-area-wrapper").classList.add("gridView");
  document
    .querySelector(".games-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".games-area-wrapper").classList.remove("gridView");
  document.querySelector(".games-area-wrapper").classList.add("tableView");
});