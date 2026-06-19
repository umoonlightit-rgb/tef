document.addEventListener("DOMContentLoaded", () => {

  const safe = (fn) => {
    try {
      fn();
    } catch (e) {
      console.log("Init skipped:", e);
    }
  };

  function initReveal() {
  const items = document.querySelectorAll(
    ".animate-in, [data-animate]"
  );

  if (!items.length) return;

  const reveal = (el) => {
    el.classList.add("in-view");
  };

  if (!window.IntersectionObserver) {
    items.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        reveal(entry.target);
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  items.forEach((el) => {
    observer.observe(el);

    const r = el.getBoundingClientRect();

    if (
      r.top <= window.innerHeight &&
      r.bottom >= 0
    ) {
      reveal(el);
    }
  });
}

  function initCounters() {
    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const animate = (el) => {
      if (el.dataset.animated === "true") return;

      el.dataset.animated = "true";

      const target = parseInt(el.dataset.target || "0", 10);
      const duration = 1400;
      const start = performance.now();

      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        el.textContent = Math.floor(target * eased);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    counters.forEach(c => observer.observe(c));
  }

  function initSwiper() {
    if (!(window.Swiper && document.querySelector(".heroSwiper"))) return;

    new Swiper(".heroSwiper", {
      loop: true,
      speed: 900,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }

  function initTheme() {
    const btns = [
      document.getElementById("themeToggle"),
      document.getElementById("mobileThemeToggle")
    ].filter(Boolean);

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
      });
    });
  }

  safe(initReveal);
  safe(initCounters);
  safe(initSwiper);
  safe(initTheme);
});

