document.addEventListener("DOMContentLoaded", () => {
  // Create cosmic effects
  createCosmicEffects();

  // Stats
  let userStats = {
    command: 15,
    insight: 5,
    endurance: 10,
    resolve: 8,
    alliance: 12,
    streak: 3,
  };

  function updateStats() {
    document.querySelector(".progress-bar.command").style.width =
      userStats.command + "%";
    document.querySelector(".progress-bar.insight").style.width =
      userStats.insight + "%";
    document.querySelector(".progress-bar.endurance").style.width =
      userStats.endurance + "%";
    document.querySelector(".progress-bar.resolve").style.width =
      userStats.resolve + "%";
    document.querySelector(".progress-bar.alliance").style.width =
      userStats.alliance + "%";
    document.querySelector(
      ".overview-card .stat-line:last-child strong"
    ).textContent = `🌟 ${userStats.streak} Days`;
  }
  updateStats();

  // Create floating stars
  function createStars() {
    const contentArea = document.querySelector('.content-area');
    const starCount = 75;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.opacity = Math.random() * 0.5 + 0.1;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      contentArea.appendChild(star);
    }
  }
  createStars();

  // Add cosmic aurora effect
  function createCosmicEffects() {
    const aurora = document.createElement('div');
    aurora.className = 'cosmic-aurora';
    document.body.appendChild(aurora);
    
    // Create space dust particles
    for (let i = 0; i < 50; i++) {
      createSpaceDust();
    }
  }

  function createSpaceDust() {
    const dust = document.createElement('div');
    dust.className = 'space-dust';
    
    // Random starting position
    dust.style.left = `${Math.random() * 100}vw`;
    dust.style.top = `${Math.random() * 100}vh`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    
    // Random opacity
    dust.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Add glowing effect for larger particles
    if (size > 2) {
      dust.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.7)`;
    }
    
    document.body.appendChild(dust);
    
    // Animate the dust particle
    animateSpaceDust(dust);
  }

  function animateSpaceDust(dustElement) {
    // Create a subtle floating animation
    const duration = Math.random() * 15000 + 10000; // 10-25 seconds
    const xDistance = Math.random() * 200 - 100; // -100px to +100px
    const yDistance = Math.random() * 200 - 100; // -100px to +100px
    
    const startLeft = parseFloat(dustElement.style.left);
    const startTop = parseFloat(dustElement.style.top);
    
    let startTime = null;
    
    function animateFrame(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const x = startLeft + (xDistance * progress);
        const y = startTop + (yDistance * progress);
        
        dustElement.style.left = `${x}vw`;
        dustElement.style.top = `${y}vh`;
        
        requestAnimationFrame(animateFrame);
      } else {
        // Reset or remove the dust particle
        document.body.removeChild(dustElement);
        createSpaceDust(); // Create a new one
      }
    }
    
    requestAnimationFrame(animateFrame);
  }

  // Confetti animation
  function showConfetti(target) {
    for (let i = 0; i < 30; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = `${Math.random() * 80 + 10}%`;
      c.style.top = "50%";
      c.style.background = `hsl(${Math.random() * 360},80%,60%)`;
      c.style.animationDelay = `${Math.random() * 0.5}s`;
      c.style.boxShadow = `0 0 6px hsl(${Math.random() * 360},80%,60%)`;
      target.appendChild(c);
      setTimeout(() => c.remove(), 1200);
    }
  }

  // Notification system
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Mark quest complete
  document.querySelectorAll(".quest-card .button, .hero-section .button").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".quest-card, .hero-section");
      showConfetti(card);
      const xpGain = 10 + Math.floor(Math.random() * 10);
      userStats.command = Math.min(userStats.command + xpGain, 100);
      userStats.streak += 1;
      updateStats();
      this.disabled = true;
      this.textContent = "Completed!";
      showNotification(`Mission completed! +${xpGain} XP gained`);
    });
  });

  // Navigation
  window.showView = function (viewId) {
    document
      .querySelector(".center-content .view-section.active-view")
      ?.classList.remove("active-view");
    const targetView = document.getElementById(`${viewId}-view`);
    if (targetView) {
      targetView.classList.add("active-view");
    } else {
      document.getElementById("dashboard-view").classList.add("active-view");
    }
    document
      .querySelectorAll(".left-sidebar .sidebar-link")
      .forEach((el) => el.classList.remove("active-link"));
    document
      .querySelector(`.left-sidebar .sidebar-link[data-view="${viewId}"]`)
      ?.classList.add("active-link");
    closeSidebarMobile();
    animateElements();
  };

  document.querySelectorAll(".left-sidebar .sidebar-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const viewToShow = link.dataset.view;
      if (viewToShow && !link.classList.contains("active-link")) {
        showView(viewToShow);
      }
    });
  });

  // Sidebar overlay for mobile
  function openSidebarMobile() {
    document.querySelector(".left-sidebar").classList.add("mobile-nav-open");
    document.querySelector(".sidebar-overlay").classList.add("active");
    document
      .querySelector(".left-sidebar .sidebar-link:visible")
      ?.focus();
  }

  function closeSidebarMobile() {
    document.querySelector(".left-sidebar").classList.remove("mobile-nav-open");
    document.querySelector(".sidebar-overlay").classList.remove("active");
  }

  document.querySelector(".menu-toggle-mobile").addEventListener("click", (e) => {
    e.stopPropagation();
    openSidebarMobile();
  });

  document.querySelector(".sidebar-overlay").addEventListener("click", () => {
    closeSidebarMobile();
  });

  // User dropdown - fixed positioning
  document.querySelector(".user-info").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    
    const dropdown = document.querySelector(".user-dropdown");
    const userInfo = document.querySelector(".user-info");
    const isOpen = dropdown.classList.contains("active");
    
    // Close dropdown if it's open
    if (isOpen) {
      dropdown.classList.remove("active");
      userInfo.setAttribute("aria-expanded", "false");
      return;
    }
    
    // Position the dropdown relative to the user info element
    const rect = userInfo.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + 5) + 'px';
    dropdown.style.left = (rect.left - dropdown.offsetWidth + rect.width) + 'px';
    
    // Show the dropdown
    dropdown.classList.add("active");
    userInfo.setAttribute("aria-expanded", "true");
    dropdown.querySelector("a").focus();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-info")) {
      document.querySelector(".user-dropdown").classList.remove("active");
      document.querySelector(".user-info").setAttribute("aria-expanded", "false");
    }
  });

  // Theme toggle
  document.querySelector(".theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    this.textContent = document.body.classList.contains("light-theme")
      ? "🌙"
      : "☀️";
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-theme") ? "light" : "dark"
    );
  });

  // Check saved theme preference
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    document.querySelector(".theme-toggle").textContent = "🌙";
  }

  // Tooltip functionality
  function setupTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach((el) => {
      if (!el.querySelector(".tooltip")) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = el.dataset.tooltip;
        el.appendChild(tooltip);

        el.addEventListener("mouseenter", () => tooltip.classList.add("show"));
        el.addEventListener("focus", () => tooltip.classList.add("show"));
        el.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
        el.addEventListener("blur", () => tooltip.classList.remove("show"));
      }
    });
  }
  setupTooltips();

  // Animation on scroll
  function animateElements() {
    document.querySelectorAll(".animate-on-scroll:not(.animated)").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (
        rect.bottom > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
      ) {
        el.classList.add("animated");
      }
    });
  }

  animateElements();
  document.querySelector(".center-content").addEventListener("scroll", animateElements);

  // Resize handler
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 768 &&
      document.querySelector(".left-sidebar.mobile-nav-open")
    ) {
      closeSidebarMobile();
    }
  });
});
