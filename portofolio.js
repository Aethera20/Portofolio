// Scroll animation functionality
const animateOnScroll = () => {
  const elements = document.querySelectorAll("h2, h3, p, ul");
  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    const isVisible = elementTop < window.innerHeight && elementBottom >= 0;

    if (isVisible) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible"); // Remove class if not visible
    }
  });
};

// Typing effect with animations for the introduction
const typingText = document.querySelector(".typing-text span");
const textArray = ["Web Developer", "UI/UX Designer", "Digital Market"];
let textIndex = 0;
let charIndex = 0;
let isTyping = true;

// Mobile menu functionality
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Add scroll event listener
window.addEventListener("scroll", animateOnScroll);
// Initial check on page load
document.addEventListener("DOMContentLoaded", animateOnScroll);

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    typingText.style.opacity = 1;
    typingText.style.transform = "translateY(0)";
    setTimeout(type, isTyping ? 150 : 50);
  } else {
    isTyping = false;
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    typingText.style.opacity = charIndex % 2 === 0 ? 0.8 : 1;
    setTimeout(erase, 50);
  } else {
    textIndex++;
    if (textIndex >= textArray.length) textIndex = 0;
    isTyping = true;
    typingText.style.opacity = 0;
    typingText.style.transform = "translateY(20px)";
    setTimeout(type, 300);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

// Smooth scrolling for navigation
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Bar Percentage animation
document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-percentage');
  const skillSection = document.querySelector('.skills');

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkSkills() {
    if (isElementInViewport(skillSection)) {
      skillBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-percentage');
      });
      window.removeEventListener('scroll', checkSkills);
    }
  }

  window.addEventListener('scroll', checkSkills);
  checkSkills(); // Initial check in case the section is already in view
});

// Cube rotation functionality
const cube = document.getElementById("cube-container");
let mouseX = 0,
  mouseY = 0;
let cubeX = 0,
  cubeY = 0;
const maxRotation = 45; // Increased rotation range
const sensitivity = 0.5; // Rotation sensitivity

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  const rect = cube.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mouseX = (e.clientX - centerX) * sensitivity;
  mouseY = (e.clientY - centerY) * sensitivity;
});

// Smooth cube movement
function moveCube() {
  // Apply easing for smooth movement
  cubeX += (mouseX - cubeX) * 0.1;
  cubeY += (mouseY - cubeY) * 0.1;

  // Apply transformation with perspective
  cube.style.transform = `
    translate(-50%, -50%)
    perspective(1000px)
    rotateX(${-cubeY}deg)
    rotateY(${cubeX}deg)
  `;

  requestAnimationFrame(moveCube);
}

// Start cube movement
moveCube();

// Form validation
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector("textarea").value;

  if (name && email && message) {
    alert(`Terima kasih, ${name}! Pesan Anda telah dikirim.`);
    form.reset();
  } else {
    alert("Silakan isi semua kolom.");
  }
});
