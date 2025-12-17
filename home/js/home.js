export function initCarousel() {
    const carouselTrack = document.querySelector(".carousel-track");
    const prevBtn = document.getElementById("genresCarouselPrev");
    const nextBtn = document.getElementById("genresCarouselNext");

    if (!carouselTrack || !prevBtn || !nextBtn) return;

    const scrollAmount = 150; // width of one genre item + gap

    prevBtn.addEventListener("click", () => {
        carouselTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        carouselTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
}