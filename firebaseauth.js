// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHQpg6ueL8a1pi0TAvVOrwdpkmXXfEQGs",
  authDomain: "nerdnetauth.firebaseapp.com",
  projectId: "nerdnetauth",
  storageBucket: "nerdnetauth.appspot.com",
  messagingSenderId: "159258918644",
  appId: "1:159258918644:web:56ac277b180b7b9091b9f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  setTimeout(function () {
    messageDiv.style.display = "none";
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  // Signup functionality
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      // Check if the terms and conditions checkbox is checked
      const termsCheckbox = document.getElementById("termsAndConditions"); // Added line
      if (!termsCheckbox.checked) {
        // Added line
        showMessage("Accept Terms and Conditions", "signupMessage"); // Added line
        return; // Stop the form submission // Added line
      }
      const email = document.getElementById("email").value;
      const password = document.getElementById("newPassword").value;
      const fullName = document.getElementById("fullName").value;
      const username = document.getElementById("username").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            fullName: fullName,
            username: username,
            email: email,
          };
          showMessage("Account Created Successfully", "signupMessage");
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email Already Exists!", "signupMessage");
          } else {
            showMessage("Unable to create User", "signupMessage");
          }
        });
    });
  }

  // Login functionality
  const signIn = document.getElementById("submitSignIn");
  if (signIn) {
    signIn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Login button clicked");

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Login successful");
          showMessage("Login is successful", "loginMessage");
          const user = userCredential.user;
          localStorage.setItem("loggedInUserId", user.uid);
          window.location.href = "main.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          console.error("Login error:", error);
          if (errorCode === "auth/invalid-credential") {
            showMessage("Incorrect Email or Password", "loginMessage");
          } else {
            showMessage("Account does not exist", "loginMessage");
          }
        });
    });
  }
});
