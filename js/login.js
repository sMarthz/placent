// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHgQavGR1MdB0sJSCj2tb6BTXQo5w9UYU",
  authDomain: "placent-cc786.firebaseapp.com",
  databaseURL: "https://placent-cc786-default-rtdb.firebaseio.com",
  projectId: "placent-cc786",
  storageBucket: "placent-cc786.appspot.com",
  messagingSenderId: "281820495205",
  appId: "1:281820495205:web:562cbf384e7fa3791e758c",
  measurementId: "G-9GKKFJGXF9"
};

let errorTexto = "";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const SignUp = document.getElementById("SignUp");

const emailRegister =  document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
const passwordRegisterConfirm = document.getElementById('password-register-confirm')

SignUp.addEventListener('click', () => {
  checkCredentials();
})

emailRegister.addEventListener("keyup", function(e){if (e.keyCode == "13") {checkCredentials()}})
passwordRegister.addEventListener("keyup", function(e){if (e.keyCode == "13") {checkCredentials()}})
passwordRegisterConfirm.addEventListener("keyup", function(e){if (e.keyCode == "13") {checkCredentials()}})

function checkCredentials() {
  var passwordRegisterValue = passwordRegister.value;
  var passwordRegisterConfirmValue = passwordRegisterConfirm.value;

  if (passwordRegisterValue && passwordRegisterConfirmValue && passwordRegisterValue == passwordRegisterConfirmValue) {
    createAccount();
  } else if (!passwordRegisterValue) {
    // Las contraseñas no coinciden
    errorTexto = "Please enter a password"
    showErrorModal();
  } else if (!(passwordRegisterValue == passwordRegisterConfirmValue)) {
    errorTexto = "Please make sure your passwords match"
    showErrorModal();
  }
}

function createAccount() {
  var emailRegisterValue = emailRegister.value;
  var passwordRegisterValue = passwordRegister.value;
  var passwordRegisterConfirmValue = passwordRegisterConfirm.value;
  createUserWithEmailAndPassword(auth, emailRegisterValue, passwordRegisterValue)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    window.location="game.html"; 
  })
  .catch((error) => {
    errorTexto = "Please enter a valid email"
    showErrorModal();
  });
}

const modalContainer = document.getElementById("error-popup");
const modalBackground = document.getElementById("error-modal-background");
const modal = document.getElementById("error-modal");
const errorMsg = document.getElementById("error-message");
let animSpeed = .2;

document.getElementById("error-modal-close").addEventListener("click", function() {
  gsap.fromTo(modal, {y: 0, opacity: 1}, {duration: animSpeed, y: 20, opacity: 0, onComplete: () => {
      modalContainer.classList.add('--hidden');
  }});
  gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0)"})

  //passwordRegister.value = "";
  //passwordRegisterConfirm.value = "";
})

function showErrorModal() {
  errorMsg.innerHTML = errorTexto;
  modalContainer.classList.remove('--hidden');
  gsap.fromTo(modal, {y: 20, opacity: 0}, {duration: animSpeed, y: 0, opacity: 1});
  gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0.5)"})
}