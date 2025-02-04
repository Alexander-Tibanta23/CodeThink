document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const carouselContainer = document.querySelector(".carousel-container");

    const slideImages = [
        'carousel-bg-1.jpg',  // Imagen para el primer slide
        'carousel-bg-2.jpg',  // Imagen para el segundo slide
        'carousel-bg-3.jpg',  // Imagen para el tercer slide
        'carousel-bg-4.jpg'   // Imagen para el cuarto slide
    ];

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");

        // Cambiar la imagen de fondo
        carouselContainer.style.backgroundImage = `url('${slideImages[index]}')`;
    }

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });

    // Cambiar la imagen de fondo cada 5 segundos
    setInterval(() => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }, 5000);

    // Inicializar la primera imagen
    showSlide(currentSlide);
});
