// =========================
// DARK / LIGHT THEME
// =========================

const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

// Load saved theme
root.dataset.theme = localStorage.getItem("theme") || "light";

// Toggle theme
themeBtn.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
});


// =========================
// MOBILE MENU
// =========================

const menu = document.getElementById("menu");
const menuBtn = document.querySelector(".menu-btn");

// Open and close menu
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    menu.classList.contains("open")
  );
});

// Close menu after clicking a link
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});


// =========================
// ACTIVE NAVIGATION
// =========================

const links = menu.querySelectorAll("a");

const navObserver = new IntersectionObserver(sections => {
  sections.forEach(section => {
    if (section.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.hash === "#" + section.target.id
        );
      });
    }
  });
}, {
  rootMargin: "-45% 0px -50% 0px"
});

// Watch each section
links.forEach(link => {
  const section = document.querySelector(link.hash);

  if (section) {
    navObserver.observe(section);
  }
});


// =========================
// PROJECT FILTERS
// =========================

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll("#work .card");

filters.forEach(button => {
  button.addEventListener("click", () => {

    // Update active filter
    filters.forEach(filter => filter.classList.remove("active"));
    button.classList.add("active");

    // Show matching projects
    projects.forEach(project => {
      const category = button.dataset.filter;

      project.classList.toggle(
        "hide",
        category !== "all" && project.dataset.cat !== category
      );
    });

  });
});


// =========================
// SHOW MORE EXPERIENCE
// =========================

const moreBtn = document.getElementById("more-jobs");
const extraJobs = document.querySelectorAll(".job.extra");

moreBtn.addEventListener("click", () => {
  const show = extraJobs[0].hidden;

  extraJobs.forEach(job => {
    job.hidden = !show;
  });

  moreBtn.textContent = show
    ? "Show fewer roles"
    : "Show more roles";
});


// =========================
// SCROLL ANIMATIONS
// =========================

const revealObserver = new IntersectionObserver(elements => {
  elements.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add("show");
      revealObserver.unobserve(element.target);
    }
  });
}, {
  threshold: 0.1
});

// Animate sections
document.querySelectorAll(".section, .hero").forEach(section => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});


// =========================
// CONTACT FORM
// =========================

const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

form.addEventListener("submit", event => {
  event.preventDefault();

  formNote.textContent =
    "Thanks! Connect a form service to start receiving messages.";

  form.reset();
});


// =========================
// COPYRIGHT YEAR
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();