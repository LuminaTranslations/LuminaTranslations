
document.getElementById("modeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const logo = document.getElementById("logo");
  if (document.body.classList.contains("dark-mode")) {
    logo.src = "assets/images/logo-dark.png";
  } else {
    logo.src = "assets/images/logo-light.png";
  }
});
