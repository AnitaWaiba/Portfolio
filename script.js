
// ========================================
// 1. MOBILE NAVIGATION
// ========================================

const menu = document.getElementById("menu");
const menuBtn = document.querySelector(".menu-btn");

if (menu && menuBtn) {

  // Open and close mobile menu
  menuBtn.addEventListener("click", () => {

    const isOpen = menu.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.textContent = isOpen ? "✕" : "☰";

  });

  // Close menu after clicking a navigation link
  menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      menu.classList.remove("open");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.textContent = "☰";

    });

  });

  // Close menu when clicking outside
  document.addEventListener("click", event => {

    if (
      !menu.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      menu.classList.remove("open");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.textContent = "☰";

    }

  });

}


// ========================================
// 2. ACTIVE NAVIGATION ON SCROLL
// ========================================

const navLinks = document.querySelectorAll("#menu a");

const sections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {

  const navObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );

        });

      }

    });

  }, {

    rootMargin: "-35% 0px -55% 0px"

  });

  sections.forEach(section => {

    navObserver.observe(section);

  });

}


// ========================================
// 3. PROJECT FILTERS
// ========================================

const filters = document.querySelectorAll(".filter");

const projects = document.querySelectorAll("#work .card");

filters.forEach(button => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    // Update active filter button
    filters.forEach(filter => {

      filter.classList.remove("active");

      filter.setAttribute("aria-pressed", "false");

    });

    button.classList.add("active");

    button.setAttribute("aria-pressed", "true");


    // Display matching projects
    projects.forEach(project => {

      const projectCategory = project.dataset.cat;

      const shouldHide =
        selectedCategory !== "all" &&
        projectCategory !== selectedCategory;

      project.classList.toggle("hide", shouldHide);

    });

  });

});


// ========================================
// 4. SHOW MORE / SHOW LESS EXPERIENCE
// ========================================

const experienceToggle = document.getElementById(
  "experienceToggle"
);

const moreExperience = document.getElementById(
  "moreExperience"
);

if (experienceToggle && moreExperience) {

  experienceToggle.addEventListener("click", () => {

    // Toggle additional experience
    const isExpanded = moreExperience.classList.toggle("show");

    // Update button text
    experienceToggle.textContent = isExpanded
      ? "Show Less"
      : "Show More";

    // Update accessibility attribute
    experienceToggle.setAttribute(
      "aria-expanded",
      isExpanded
    );

  });

}


// ========================================
// 5. SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(
  ".hero, .section"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);

      }

    });

  }, {

    threshold: 0.1

  });

  revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });

} else {

  // Fallback for browsers without IntersectionObserver
  revealElements.forEach(element => {

    element.classList.add("show");

  });

}


// ========================================
// 6. CONTACT FORM
// ========================================

const contactForm = document.getElementById("contact-form");

const formNote = document.getElementById("form-note");

if (contactForm && formNote) {

  contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formNote.textContent =
      "Thank you for your message! A form service needs to be connected to receive submissions.";

    contactForm.reset();

  });

}


// ========================================
// 7. AUTOMATIC COPYRIGHT YEAR
// ========================================

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}
