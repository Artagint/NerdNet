// Import the functions from the SDK's
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"; // Import FireBase initialization
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; // Import Firebase auth functions
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; // Import Firestore functions

// Firebase configurations will be hidden for security reasons but you'd basically just put your own keys for each const.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase (app, auth, and db)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // database (db)

// Function to show pop-up messages
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId); // Use the ID of the div to get the message
  messageDiv.style.display = "block"; // Show the message div
  messageDiv.innerHTML = message; // Show the text
  setTimeout(function () {
    messageDiv.style.display = "none"; // Message appears for 4 seconds then hides
  }, 4000);
}

// Run only after the DOM has been loaded
document.addEventListener("DOMContentLoaded", () => {
  // Signup
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    // Check if the Sign Up button exists
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      // Check if user agreed to terms and condition
      const termsCheckbox = document.getElementById("termsAndConditions");
      if (!termsCheckbox.checked) {
        showMessage("Accept Terms and Conditions", "signupMessage");
        return;
      }
      // Get values for the specified const's
      const email = document.getElementById("email").value;
      const password = document.getElementById("newPassword").value;
      const fullName = document.getElementById("fullName").value;
      const username = document.getElementById("username").value;

      // Check if the password meets the required pattern of atleast 8 characters, 1 special character, 1 number, and 1 uppercase letter and 1 lowercase letter
      const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
      if (!passwordPattern.test(password)) {
        showMessage("Invalid Password Format", "signupMessage");
        return; // Stop the form submission
      }

      // Create a user with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Set user data to the specified fields
          const userData = {
            fullName: fullName,
            username: username,
            email: email,
          };
          showMessage("Account Created Successfully", "signupMessage");
          const docRef = doc(db, "users", user.uid);
          // Set user data in Firestore
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
          // Check for duplicate email
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email Already In Use", "signupMessage");
          } else {
            showMessage("Unable to Make Account", "signupMessage");
          }
        });
    });
  }

  // Login
  const signIn = document.getElementById("submitSignIn");
  if (signIn) {
    // Check if Login button exists
    signIn.addEventListener("click", (event) => {
      event.preventDefault();
      // Get the specified values for the const's
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Login button clicked");

      // Sign in with email and password using auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Login successful");
          showMessage("Login successful", "loginMessage");
          const user = userCredential.user;
          localStorage.setItem("loggedInUserId", user.uid); // Save user ID to local storage
          window.location.href = "main.html";
        })
        // Print error message if credentials are invalid
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
