import { initNav } from "./nav.mjs";
import { initCarousel } from "./home.js";
import { initAvatarModal, loadMovies, initMovieModal } from "./modal.mjs";
import { initContactModal } from "./contact-modal.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    initNav();
    initCarousel();
    initAvatarModal();
    initContactModal();

    const movies = await loadMovies();
    initMovieModal(movies);
});