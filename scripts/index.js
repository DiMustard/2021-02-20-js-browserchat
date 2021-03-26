import C from './controller.js';

document.addEventListener("click", e => {
    if (e.target.classList.contains("enter-nickname")) C.enter()
});

document.addEventListener("keydown", e => {
    if (e.key === "Enter") C.enter()
});