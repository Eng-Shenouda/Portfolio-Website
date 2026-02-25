/* ================= Sections & Navbar ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Hero Elements
const heroTextContainer = document.querySelector(".hero-left");
const heroImage = document.querySelector(".hero-right img.profile");

// About Section
const aboutSection = document.querySelector(".About");
const aboutLeft = aboutSection?.querySelector(".Left");
const aboutRight = aboutSection?.querySelector(".Right");

// Projects Section
const projectsSection = document.querySelector(".Projects");
const projectsTitle = projectsSection?.querySelector("h1");
const projectCards = projectsSection?.querySelectorAll(".container .card");

// Certificates Section
const certificatesSection = document.querySelector(".Certificates");
const certificatesTitle = certificatesSection?.querySelector("h1");
const certificateItems = certificatesSection?.querySelectorAll(".image-links a");

// Contact Section
const contactSection = document.querySelector(".Contact");
const contactTitle = contactSection?.querySelector("h1");
const contactElements = contactSection?.querySelectorAll("input, textarea, button");

/* ================= Scroll Flags ================= */
const scrollAnimated = {
  hero: false,
  about: false,
  projects: false,
  certificates: false,
  contact: false,
};

/* ================= Animation Helpers ================= */
function animateHero() {
  heroTextContainer?.classList.remove("animate");
  heroImage?.classList.remove("animate");
  void heroTextContainer?.offsetWidth;
  heroTextContainer?.classList.add("animate");
  heroImage?.classList.add("animate");
}

function animateAbout() {
  aboutLeft?.classList.remove("animate");
  aboutRight?.classList.remove("animate");
  void aboutLeft?.offsetWidth;
  aboutLeft?.classList.add("animate");
  aboutRight?.classList.add("animate");
}

// Projects
function resetProjectsAnimation() {
  projectsTitle?.classList.remove("animate");
  projectCards.forEach(card => card.classList.remove("animate"));
}

function animateProjects() {
  projectsTitle?.classList.remove("animate");
  void projectsTitle?.offsetWidth;
  projectsTitle?.classList.add("animate");

  projectCards.forEach((card, index) => {
    card.classList.remove("animate");
    setTimeout(() => card.classList.add("animate"), 200 + index * 200);
  });
}

// Certificates
function resetCertificatesAnimation() {
  certificatesTitle?.classList.remove("animate");
  certificateItems.forEach(item => item.classList.remove("animate"));
}

function animateCertificates() {
  certificatesTitle?.classList.remove("animate");
  void certificatesTitle?.offsetWidth;
  certificatesTitle?.classList.add("animate");

  certificateItems.forEach((item, index) => {
    item.classList.remove("animate");
    setTimeout(() => item.classList.add("animate"), 300 + index * 150);
  });
}

// Contact
function resetContactAnimation() {
  contactTitle?.classList.remove("animate");
  contactElements.forEach(el => el.classList.remove("animate"));
}

function animateContact() {
  contactTitle?.classList.remove("animate");
  void contactTitle?.offsetWidth;
  contactTitle?.classList.add("animate");

  contactElements.forEach((el, index) => {
    el.classList.remove("animate");
    setTimeout(() => el.classList.add("animate"), 300 + 150 * index);
  });
}

/* ================= Navbar Active & Scroll ================= */
function updateNavbarActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove("active"));
      document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add("active");

      // Animate on first scroll only
      switch (id) {
        case "about":
          if (!scrollAnimated.about) {
            animateAbout();
            scrollAnimated.about = true;
          }
          break;
        case "projects":
          if (!scrollAnimated.projects) {
            animateProjects();
            scrollAnimated.projects = true;
          }
          break;
        case "certificates":
          if (!scrollAnimated.certificates) {
            animateCertificates();
            scrollAnimated.certificates = true;
          }
          break;
        case "contact":
          if (!scrollAnimated.contact) {
            animateContact();
            scrollAnimated.contact = true;
          }
          break;
      }
    }
  });
}

function handleScrollAnimations() {
  const scrollY = window.scrollY;
  const windowBottom = scrollY + window.innerHeight;

  if (!scrollAnimated.hero && windowBottom > heroTextContainer?.offsetTop) {
    animateHero();
    scrollAnimated.hero = true;
  }

  if (!scrollAnimated.about && windowBottom > aboutSection?.offsetTop) {
    animateAbout();
    scrollAnimated.about = true;
  }

  if (!scrollAnimated.projects && windowBottom > projectsSection?.offsetTop + 150) {
    animateProjects();
    scrollAnimated.projects = true;
  }

  if (!scrollAnimated.certificates && windowBottom > certificatesSection?.offsetTop + 150) {
    animateCertificates();
    scrollAnimated.certificates = true;
  }

  if (!scrollAnimated.contact && windowBottom > contactSection?.offsetTop + 50) {
    animateContact();
    scrollAnimated.contact = true;
  }
}

/* ================= Scroll & Load ================= */
window.addEventListener("scroll", () => {
  updateNavbarActive();
  handleScrollAnimations();
});

document.addEventListener("DOMContentLoaded", () => {
  handleScrollAnimations();
  updateNavbarActive();
});

/* ================= Navbar Click ================= */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({ behavior: "smooth" });
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Animate everything **every click** for the target section
    switch (targetId) {
      case "home":
        animateHero();
        break;
      case "about":
        animateAbout();
        break;
      case "projects":
        resetProjectsAnimation();
        animateProjects();
        break;
      case "certificates":
        resetCertificatesAnimation();
        animateCertificates();
        break;
      case "contact":
        resetContactAnimation();
        animateContact();
        break;
    }
  });
});

/* ================= Buttons ================= */
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}
