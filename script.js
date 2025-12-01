document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  /* ---------- PROJECT 4: Thumbnail Carousel ---------- */
  document.querySelectorAll(".thumb.carousel").forEach((carousel, idx) => {
    const slides = carousel.querySelector(".slides");
    if (!slides) { console.warn("No .slides in carousel", idx); return; }

    const imgs = Array.from(slides.querySelectorAll("img"));
    if (!imgs.length) { console.warn("No imgs in .slides", idx); return; }

    let i = imgs.findIndex(img => img.classList.contains("active"));
    if (i < 0) { i = 0; imgs[0].classList.add("active"); }

    const show = (n) => {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach((img, k) => img.classList.toggle("active", k === i));
    };

    const next = carousel.querySelector(".next");
    const prev = carousel.querySelector(".prev");

    next?.addEventListener("click", (e) => {
      e.stopPropagation();
      show(i + 1);
    });
    prev?.addEventListener("click", (e) => {
      e.stopPropagation();
      show(i - 1);
    });

    // Click image to advance (optional)
    slides.addEventListener("click", () => show(i + 1));
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightImg = document.getElementById("lightbox-img");
  const nextBtn  = document.querySelector(".light-next");
  const prevBtn  = document.querySelector(".light-prev");
  const closeBtn = document.querySelector(".lightbox .close");
  let currentSet = [], currentIndex = 0;

  // Open expanded carousel
  const expandBtn = document.querySelector(".thumb.carousel .expand");
  expandBtn?.addEventListener("click", () => {
    currentSet = Array.from(document.querySelectorAll(".thumb.carousel .slides img"));
    if (!currentSet.length) return;

    currentIndex = Math.max(0, currentSet.findIndex(img => img.classList.contains("active")));
    lightImg.src = currentSet[currentIndex].src;
    lightbox.classList.add("active");
  });

  // Lightbox navigation
  nextBtn?.addEventListener("click", () => {
    if (!currentSet.length) return;
    currentIndex = (currentIndex + 1) % currentSet.length;
    lightImg.src = currentSet[currentIndex].src;
  });
  prevBtn?.addEventListener("click", () => {
    if (!currentSet.length) return;
    currentIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    lightImg.src = currentSet[currentIndex].src;
  });
  closeBtn?.addEventListener("click", () => lightbox.classList.remove("active"));
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });
  /* ---------- CONTACT PAGE INTERACTIONS ---------- */
  if (document.body.classList.contains("contact")) {
    console.log("Contact page loaded");

    // you can add extra behaviors later (analytics, animations, etc)
  }
});