const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const container = document.getElementById("index-container");
let currentForm = "login"

let duracionAnim = .2;

const changeForm = document.getElementById("change-form");

function changeFormLayout(e) {
  if (currentForm == "login") {
    // Cambiar a registro
    loginForm.classList.add("opacity-0");
    loginForm.classList.add("pointer-events-none");
    setTimeout(function () {
        registerForm.classList.remove("opacity-0");
        registerForm.classList.remove("pointer-events-none");
        container.classList.add("--register");
    }, 600)
    currentForm = "register"
  } else {
    // Cambiar a logueo
    registerForm.classList.add("opacity-0");
    registerForm.classList.add("pointer-events-none");
    setTimeout(function () {
        loginForm.classList.remove("opacity-0");
        loginForm.classList.remove("pointer-events-none");
        container.classList.remove("--register");
    }, 600)
    currentForm = "login"
  }
}

