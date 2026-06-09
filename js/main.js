
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded");
  // =========================
  // SWIPER HERO SLIDER
  // =========================
  const swiper = new Swiper(".heroSwiper", {

    loop: true,

    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },

    speed: 1000,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      init() {
        setTimeout(animateSlide, 300);
      },

      slideChangeTransitionStart() {
        resetAnimation();
      },

      slideChangeTransitionEnd() {
        setTimeout(animateSlide, 200);
      }
    }
  });

  // =========================
  // STAGGER ANIMATION
  // =========================

  function animateSlide() {
    const activeSlide = document.querySelector(".swiper-slide-active");
    if (!activeSlide) return;

    const badge = activeSlide.querySelector(".hero-badge");
    const title = activeSlide.querySelector(".hero-title");
    const text = activeSlide.querySelector(".hero-text");

    setTimeout(() => {
      badge?.classList.add("animate-in");
    }, 200);

    setTimeout(() => {
      title?.classList.add("animate-in");
    }, 500);

    setTimeout(() => {
      text?.classList.add("animate-in");
    }, 800);
  }


  function resetAnimation() {
    document.querySelectorAll(".hero-badge, .hero-title, .hero-text")
      .forEach(el => {
        el.classList.remove("animate-in");
      });
  }
  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================
  const navbar =
    document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {

      navbar.classList.add(
        "shadow-md",
        "bg-white/90"
      );

    } else {

      navbar.classList.remove(
        "shadow-md",
        "bg-white/90"
      );

    }
  });

  // =========================
  // COUNTER
  // =========================
  const counters =
    document.querySelectorAll(".counter");
  counters.forEach(counter => {
    counter.innerText = "0";

    const target =
      +counter.dataset.target;

    const updateCounter = () => {

      const current =
        +counter.innerText;

      const increment =
        Math.ceil(target / 100);

      if (current < target) {

        counter.innerText =
          Math.min(current + increment, target);

        setTimeout(updateCounter, 20);

      } else {

        counter.innerText = target;

      }

    };

    updateCounter();
  });

  // =========================
  // DARK MODE
  // =========================
  const themeToggle =
    document.getElementById("themeToggle");
  const mobileThemeToggle =
    document.getElementById("mobileThemeToggle");
  function updateThemeIcons() {
    const isDark =
      document.documentElement
        .classList.contains("dark");

    if (themeToggle) {
      themeToggle.textContent =
        isDark ? "☀️" : "🌙";
    }

    if (mobileThemeToggle) {
      mobileThemeToggle.textContent =
        isDark
          ? "☀️ Light Mode"
          : "🌙 Dark Mode";
    }
  }
  if (
    localStorage.getItem("theme") === "dark"
  ) {
    document.documentElement
      .classList.add("dark");
  }
  updateThemeIcons();
  function toggleTheme() {
    document.documentElement
      .classList.toggle("dark");

    const isDark =
      document.documentElement
        .classList.contains("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    updateThemeIcons();
  }
  themeToggle?.addEventListener(
    "click",
    toggleTheme
  );
  mobileThemeToggle?.addEventListener(
    "click",
    toggleTheme
  );


  // =========================
  // MOBILE MENU
  // =========================

  const menuBtn =
    document.getElementById("menuBtn");
  const mobileMenu =
    document.getElementById("mobileMenu");
  const hamburgerIcon = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="w-8 h-8"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor">

  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M4 6h16M4 12h16M4 18h16"/>

</svg>
`;
  menuBtn?.addEventListener("click", () => {
    if (
      mobileMenu.classList.contains("max-h-0")
    ) {

      mobileMenu.classList.remove(
        "max-h-0"
      );

      mobileMenu.classList.add(
        "max-h-96"
      );

      menuBtn.innerHTML = "&times;";

    } else {

      mobileMenu.classList.remove(
        "max-h-96"
      );

      mobileMenu.classList.add(
        "max-h-0"
      );

      menuBtn.innerHTML =
        hamburgerIcon;

    }
  });
});