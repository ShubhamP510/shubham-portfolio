// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 700);
});

// AOS
AOS.init({
  duration: 900,
  once: true
});

// Typing effect
const typingText = document.getElementById("typing-text");
const words = [
  "Python Full-Stack Developer",
  "Django Developer",
  "REST API Developer",
  "Freelancer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typingText.textContent = currentText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 45);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// Navbar scroll
const navbar = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectItems.forEach(item => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Back to top
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Active nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Auto close mobile navbar on nav click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.getElementById("mainNavbar");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});

// Project modal
const modal = document.getElementById("projectModal");
const closeModalBtn = document.getElementById("closeProjectModal");
const modalBtns = document.querySelectorAll(".project-modal-btn");

const modalTitle = document.getElementById("modalProjectTitle");
const modalImage = document.getElementById("modalProjectImage");
const modalDescription = document.getElementById("modalProjectDescription");
const modalTech = document.getElementById("modalProjectTech");
const modalFeatures = document.getElementById("modalProjectFeatures");

modalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title;
    modalImage.src = btn.dataset.image;
    modalDescription.textContent = btn.dataset.description;
    modalTech.textContent = btn.dataset.tech;
    modalFeatures.textContent = btn.dataset.features;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeProjectModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

closeModalBtn.addEventListener("click", closeProjectModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

// EmailJS setup
emailjs.init("YOUR_PUBLIC_KEY");

// Contact form
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;
  formMessage.textContent = "";

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      formMessage.textContent = "Message sent successfully.";
      contactForm.reset();
    })
    .catch(() => {
      formMessage.textContent = "Something went wrong. Please try again.";
    })
    .finally(() => {
      sendBtn.textContent = "Send Message";
      sendBtn.disabled = false;
    });
});