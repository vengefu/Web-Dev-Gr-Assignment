//JAVASCRIPT FUNCTIONS FOR THE INDEX.HTML FILE
//HERO SECTION - THE TYPING PROPERTY
document.addEventListener("DOMContentLoaded", function () {
  const element = document.getElementById("about-me");
  const words = [
    "Web Developer.",
    "Web Designer.",
    "Photographer.",
    "Freelancer.",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    element.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 100); // Typing speed
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50); // Deleting speed
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 1000); // Pause before next word
    }
  }

  typeEffect();
});


  // SKILL BARS
  const bars = document.querySelectorAll(".progress-bar");
  bars.forEach((bar) => {
    const target = bar.getAttribute("data-skill");
    bar.style.width = target + "%";
    bar.textContent = target + "%";
  });
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

// TESTIMONIAL SECTION SLIDES
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack1");
  const interval = 3000; // 3 seconds
  let currentIndex = 0;

  const items = track.children;
  const itemWidth = items[0].offsetWidth;

  // Clone all items once for seamless looping
  const cloneCount = items.length;
  for (let i = 0; i < cloneCount; i++) {
    const clone = items[i].cloneNode(true);
    track.appendChild(clone);
  }

  const moveItem = () => {
    currentIndex++;
    track.style.transition = "transform 1s ease-in-out";
    track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;

    // If reached end of original set, reset
    if (currentIndex >= cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        currentIndex = 0;
      }, 1000); // Wait for transition to complete
    }
  };

  setInterval(moveItem, interval);
});

//THEME BUTTONS
document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;

  // Grab both toggle buttons & their icons
  const themeControls = [
    {
      btn:  document.getElementById("theme-toggle-sm"),
      sun:  document.getElementById("sun-icon-sm"),
      moon: document.getElementById("moon-icon-sm")
    },
    {
      btn:  document.getElementById("theme-toggle-lg"),
      sun:  document.getElementById("sun-icon-lg"),
      moon: document.getElementById("moon-icon-lg")
    }
  ];

  function updateIcons(theme) {
    themeControls.forEach(({ sun, moon }) => {
      if (theme === "dark") {
        sun.classList.add("d-none");
        moon.classList.remove("d-none");
      } else {
        sun.classList.remove("d-none");
        moon.classList.add("d-none");
      }
    });
  }

  function toggleTheme(e) {
    e.preventDefault();
    const current = htmlEl.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    htmlEl.setAttribute("data-theme", next);
    updateIcons(next);
  }

  // Initialize icons based on starting theme
  updateIcons(htmlEl.getAttribute("data-theme") || "light");

  // Attach listeners
  themeControls.forEach(({ btn }) => {
    btn?.addEventListener("click", toggleTheme);
  });
});


//SEARCH BAR
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const searchLg     = document.getElementById("search-icon-lg");
  const searchSm     = document.getElementById("search-icon-sm");
  const overlay      = document.getElementById("search-overlay");
  const overlayClose = document.getElementById("overlay-close");
  const input        = document.getElementById("live-search");
  const resultsList  = document.getElementById("search-results");

  // Collect searchable content
  const contentArray = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, p, li, .searchable")
  )
  .map(el => ({ text: el.textContent.trim(), el }))
  .filter(item => item.text.length > 3);

  // Open & close handlers
  function openSearch() {
    overlay.classList.remove("d-none");
    input.focus();
  }
  function closeSearch() {
    overlay.classList.add("d-none");
    input.value = "";
    resultsList.classList.add("d-none");
    resultsList.innerHTML = "";
  }

  // Live filtering
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    resultsList.innerHTML = "";

    if (!q) {
      resultsList.classList.add("d-none");
      return;
    }

    const matches = contentArray.filter(item =>
      item.text.toLowerCase().includes(q)
    );

    if (matches.length) {
      matches.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item.text;
        li.addEventListener("click", () => {
          item.el.scrollIntoView({ behavior: "smooth", block: "center" });
          closeSearch();
        });
        resultsList.append(li);
      });
    } else {
      resultsList.innerHTML = `<li class="list-group-item">No results found</li>`;
    }

    resultsList.classList.remove("d-none");
  });

  // Hook up search icons
  [searchLg, searchSm].forEach(btn => {
    btn?.addEventListener("click", e => {
      e.preventDefault();
      openSearch();
    });
  });

  // Close button
  overlayClose.addEventListener("click", e => {
    e.preventDefault();
    closeSearch();
  });
});
