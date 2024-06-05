// Go back to previous webpage after reading terms and conditions --------------------- //
function goBackTerms() {
  window.history.back();
}

// Toggle between show password or text when user clicks icon ------------------------- //
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".passwordInput");
  const icons = document.querySelectorAll(".showPasswordIcon");

  icons.forEach((icon, index) => {
    icon.addEventListener("click", function () {
      const input = inputs[index];
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
      this.classList.toggle("fa-eye");
    });
  });
});

// Compare Create New Password and Re-enter New Password in Sign Up (signup.html) ----- //
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".signupBox form");
  form.addEventListener("submit", function (event) {
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    if (password !== confirmPassword) {
      alert(
        "The passwords entered don't match! Check both password fields to ensure they match."
      );
      event.preventDefault();
    } else {
      window.location.href = "login.html";
      event.preventDefault();
    }
  });
});
