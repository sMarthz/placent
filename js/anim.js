const user = document.getElementById("user-name");
const main = document.getElementById("main");
const modalContainer = document.getElementById("user-modal-container");
const modalBackground = document.getElementById("user-modal-background");
const modal = document.getElementById("user-modal");

let animSpeed = .2;

function showUserModal() {
    modalContainer.classList.remove('--hidden');
    gsap.fromTo(modal, {y: 20, opacity: 0}, {duration: animSpeed, y: 0, opacity: 1});
    gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0.5)"})
}


modalBackground.addEventListener("click", () => {
    gsap.fromTo(modal, {y: 0, opacity: 1}, {duration: animSpeed, y: 20, opacity: 0, onComplete: () => {
        modalContainer.classList.add('--hidden');
    }});
    gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0)"})
})