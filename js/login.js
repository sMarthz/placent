// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider,  sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth = getAuth(app);
 const providerGoogle = new GoogleAuthProvider(app);
 const providerTwitter = new TwitterAuthProvider(app);
 

 const SignUp = document.getElementById("SignUp");
 const SignIn = document.getElementById("SignIn");
 const SignOut = document.getElementById("SignOut");

 const SignInGoogle = document.getElementById("SignInGoogle");
 const SignInTwitter = document.getElementById("SignInTwitter");

 let isEmailVerified = false;

 let errorTexto = "";


 if(SignInTwitter)
 SignInTwitter.addEventListener('click',(e) => { 
  
 signInWithPopup(auth, providerTwitter)
   .then((result) => {
     // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
     // You can use these server side with your app's credentials to access the Twitter API.
    
     const credential = TwitterAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     const secret = credential.secret;
     
     // The signed-in user info.
     const user = result.user;
     
     
     // ...
   }).catch((error) => {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.email;
     // The AuthCredential type that was used.
     const credential = TwitterAuthProvider.credentialFromError(error);
     // ...
   });
  });
 

 /* if(SignInFacebook)
  SignInFacebook.addEventListener('click',(e) => {  
signInWithPopup(auth, providerFacebook)
  .then((result) => {
  
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}); */
 



if(SignInGoogle)
SignInGoogle.addEventListener('click',(e) => {
// sign in with popup tab
signInWithPopup(auth, providerGoogle)
 .then((result) => {
   // This gives you a Google Access Token. You can use it to access the Google API.
   const credential = GoogleAuthProvider.credentialFromResult(result);
   const token = credential.accessToken;
   // The signed-in user info.
   const user = result.user;
   window.location="game.html"; 

   alert(user.displayName);
   // ...
 }).catch((error) => {
   // Handle Errors here.
   const errorCode = error.code;
   const errorMessage = error.message;
   // The email of the user's account used.
   const email = error.email;
   // The AuthCredential type that was used.
   const credential = GoogleAuthProvider.credentialFromError(error);
   // ...

 });
});

  
 if(SignUp)
 SignUp.addEventListener('click',(e) => {

 var emailRegister = document.getElementById('email-register').value;
 var passwordRegister = document.getElementById('password-register').value;
 var passwordRegisterConfirm = document.getElementById('password-register-confirm').value;

  
 createUserWithEmailAndPassword(auth, emailRegister, passwordRegister).then((userCredential) => {
    
  sendEmailVerification(auth.currentUser).then(() => {
    isEmailVerified = true;
    alert('Email Sent!');
  });

     // ...
   })
   .catch((error) => {
    showErrorModal(error.message)
   // ..
   });

});




if(SignIn)
SignIn.addEventListener('click',(e)=>{
  var emailLogin = document.getElementById('email-login').value;
  var passwordLogin = document.getElementById('password-login').value;

     signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
     .then((userCredential) => {
       // Signed in 
      
     
       const user = userCredential.user;
       window.location="game.html";
        alert('User loged in!');
       
       // ...
     })
     .catch((error) => {
      showErrorModal(error.message)
 });

});
const user = auth.currentUser;


if(SignOut)
SignOut.addEventListener('click',(e)=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location="index.html"; 
    alert('user loged out');
  }).catch((error) => {
    // An error happened.
    showErrorModal(error.message)
  });

  });


const modalContainer = document.getElementById("error-popup");
const modalBackground = document.getElementById("error-modal-background");
const modal = document.getElementById("error-modal");
const errorMsg = document.getElementById("error-message");
const modalClose = document.getElementById("error-modal-close");
let animSpeed = .2;

if(modalClose)
modalClose.addEventListener("click", function() {
  gsap.fromTo(modal, {y: 0, opacity: 1}, {duration: animSpeed, y: 20, opacity: 0, onComplete: () => {
      modalContainer.classList.add('--hidden');
  }});
  gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0)"})

  //passwordRegister.value = "";
  //passwordRegisterConfirm.value = "";
})

function showErrorModal(textoError) {
  errorMsg.innerHTML = textoError;
  modalContainer.classList.remove('--hidden');
  gsap.fromTo(modal, {y: 20, opacity: 0}, {duration: animSpeed, y: 0, opacity: 1});
  gsap.to(modalBackground, {duration: animSpeed, backgroundColor: "rgba(0, 0, 0, 0.5)"})
}