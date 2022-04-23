const user = document.getElementById("user-name");
const main = document.getElementById("main");
const modalContainer = document.getElementById("user-modal-container");
const modalBackground = document.getElementById("user-modal-background");
const modal = document.getElementById("user-modal");

const body = document.body;

const userNameEditable = document.getElementById("user-name-editable");

let storageName = "Luisito Comunica";

let modalActive = false;

let animSpeed = .2;

function showUserModal() {
    modalActive = true;
    modalContainer.classList.remove('--hidden');
    gsap.fromTo(modal, {y: 20, opacity: 0}, {duration: animSpeed, y: 0, opacity: 1});
    gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0.5)"})
}

function hideUserModal() {
    modalActive = false;
    gsap.fromTo(modal, {y: 0, opacity: 1}, {duration: animSpeed, y: 20, opacity: 0, onComplete: () => {
        modalContainer.classList.add('--hidden');
    }});
    gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0)"})
    userNameEditable.disabled = true;
    userNameEditable.value = storageName;
}

function changeUserName() {
    if (userNameEditable.disabled) {
        userNameEditable.disabled = false;
        let end = userNameEditable.value.length;
        userNameEditable.setSelectionRange(end, end);
        userNameEditable.focus();
    } else {
        userNameEditable.disabled = true;
        user.innerHTML = userNameEditable.value;
        storageName = userNameEditable.value;
    }
}

userNameEditable.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        userNameEditable.disabled = true;
        user.innerHTML = userNameEditable.value;
        storageName = userNameEditable.value;
    }
});

body.addEventListener("keyup", (e) => {
    if (e.keyCode  == 27 && modalActive) {
        hideUserModal();
    }
});