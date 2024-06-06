// Go back to previous webpage after reading terms and conditions
function goBackTerms() {
  window.history.back();
}

// Run the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Toggle between show password or text when user clicks eye icon
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
