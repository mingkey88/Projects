"use strict";

// Three.js 3D Scene for Hero Section
class HeroScene3D {
  constructor() {
    this.canvas = document.getElementById('hero-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = [];
    this.questItems = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    
    this.init();
  }  init() {
    if (!this.canvas) return;
    
    const loadingIndicator = document.getElementById('hero-loading');
    
    // Check for WebGL support
    if (!this.isWebGLSupported()) {
      console.warn('WebGL not supported, falling back to CSS animations');
      if (loadingIndicator) {
        loadingIndicator.innerHTML = '<p>3D not supported, using enhanced animations</p>';
        setTimeout(() => loadingIndicator.classList.add('hidden'), 2000);
      }
      return;
    }

    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);    this.createParticles();
    this.createQuestItems();
    this.createLights();
    this.bindEvents();
    this.animate();
    
    // Hide loading indicator once scene is ready
    if (loadingIndicator) {
      setTimeout(() => {
        loadingIndicator.classList.add('hidden');
      }, 1000);
    }
  }

  isWebGLSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
      return false;
    }
  }  createParticles() {
    // No particles - simplified scene
  }createQuestItems() {
    this.questItems = [];
    
    // Create 7 different shapes with uniform size: prism, cube, cylinder, sphere, pyramid, wireframe cube, wireframe prism
    const geometries = [
      new THREE.CylinderGeometry(0, 0.5, 1, 3), // Triangular prism
      new THREE.BoxGeometry(0.8, 0.8, 0.8), // Cube
      new THREE.CylinderGeometry(0.4, 0.4, 1, 16), // Cylinder
      new THREE.SphereGeometry(0.5, 16, 12), // Sphere
      new THREE.ConeGeometry(0.5, 1, 4), // Pyramid (square base)
      new THREE.BoxGeometry(0.8, 0.8, 0.8), // Wireframe cube
      new THREE.CylinderGeometry(0, 0.5, 1, 3) // Wireframe triangular prism
    ];
    
    const colors = [0xFB7A93, 0xFF6B9D, 0xF06292, 0xE91E63, 0xEC407A, 0xF48FB1, 0xF8BBD9];
    
    for (let i = 0; i < 7; i++) {
      const geometry = geometries[i];
      let material;
      
      // Create wireframe materials for the last two objects
      if (i === 5 || i === 6) {
        material = new THREE.MeshBasicMaterial({
          color: colors[i],
          wireframe: true,
          transparent: true,
          opacity: 0.8
        });
      } else {
        material = new THREE.MeshPhongMaterial({
          color: colors[i],
          transparent: true,
          opacity: 0.9,
          shininess: 100
        });
      }

      const questItem = new THREE.Mesh(geometry, material);
      
      // Position objects randomly across the entire canvas
      questItem.position.set(
        (Math.random() - 0.5) * 20, // X: -10 to 10
        (Math.random() - 0.5) * 15, // Y: -7.5 to 7.5
        (Math.random() - 0.5) * 15  // Z: -7.5 to 7.5
      );
      
      // Random rotation for each object
      questItem.rotation.x = Math.random() * Math.PI;
      questItem.rotation.y = Math.random() * Math.PI;
      questItem.rotation.z = Math.random() * Math.PI;
      
      questItem.originalPosition = questItem.position.clone();
      
      this.questItems.push(questItem);
      this.scene.add(questItem);
    }
  }createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Multiple colored lights to illuminate the 5 prisms
    const light1 = new THREE.PointLight(0xFB7A93, 1, 100);
    light1.position.set(5, 5, 5);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0x8A4FFF, 1, 100);
    light2.position.set(-5, 3, 5);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0x4ECDC4, 0.8, 100);
    light3.position.set(0, 5, -5);
    this.scene.add(light3);
  }

  bindEvents() {
    // Mouse movement for camera interaction
    document.addEventListener('mousemove', (event) => {
      this.mouseX = (event.clientX - window.innerWidth / 2) / window.innerWidth;
      this.mouseY = (event.clientY - window.innerHeight / 2) / window.innerHeight;
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll interaction
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
      
      // Move camera based on scroll
      this.camera.position.z = 5 + scrollProgress * 10;
      this.camera.rotation.x = scrollProgress * 0.5;
    });
  }  animate() {
    requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;    // Animate the 7 different 3D objects floating across the canvas
    this.questItems.forEach((item, index) => {
      // Slow rotation for each object
      item.rotation.x += 0.002 + index * 0.0003;
      item.rotation.y += 0.003 + index * 0.0002;
      
      // Random floating motion across the entire canvas
      const offset = index * 1.2;
      const timeScale = 0.5 + index * 0.1; // Different speeds for each object
      
      item.position.y = item.originalPosition.y + Math.sin(time * timeScale + offset) * 2;
      item.position.x = item.originalPosition.x + Math.cos(time * (timeScale * 0.8) + offset) * 1.5;
      item.position.z = item.originalPosition.z + Math.sin(time * (timeScale * 0.6) + offset * 0.5) * 1;
    });

    // Smooth camera movement based on mouse
    this.targetRotationX = this.mouseY * 0.1;
    this.targetRotationY = this.mouseX * 0.1;
    
    this.camera.rotation.x += (this.targetRotationX - this.camera.rotation.x) * 0.05;
    this.camera.rotation.y += (this.targetRotationY - this.camera.rotation.y) * 0.05;

    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D Hero Scene
  new HeroScene3D();

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("mobile-menu-close");
  const mobileLinks = mobileMenu.querySelectorAll("a"); // Get all links in mobile menu

  if (menuToggle && mobileMenu && menuClose) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });

    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = ""; // Restore scroll
    });

    // Close menu when a link is clicked (for single-page navigation)
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = ""; // Restore scroll
      });
    });
  }

  // --- Smooth Scrolling for internal links ---
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Check if it's not just a hash link for accessibility or other JS features
      if (this.hash !== "" && this.pathname === window.location.pathname) {
        // Check if the target element exists
        const targetElement = document.querySelector(this.hash);
        if (targetElement) {
          e.preventDefault(); // Prevent default anchor click behavior

          // Calculate scroll position, considering potential sticky header height
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerHeight - 20; // Adjust offset as needed

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Optional: Update URL hash without jumping
          // history.pushState(null, null, this.hash);
        }
      }
    });
  });

  // --- Optional: Add active class to nav link on scroll ---
  const sections = document.querySelectorAll("section[id]"); // Select all sections with an ID
  const navLinksDesktop = document.querySelectorAll(".header .nav-links a");
  const navLinksMobile = document.querySelectorAll(".mobile-menu a");

  function setActiveLink() {
    let currentSectionId = "";
    const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
    const scrollPosition = window.scrollY + headerHeight + 50; // Offset to trigger earlier

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Update desktop links
    navLinksDesktop.forEach((link) => {
      link.classList.remove("active");
      // Check if href exists and matches before adding class
      if (
        link.getAttribute("href") &&
        link.getAttribute("href") === `#${currentSectionId}`
      ) {
        link.classList.add("active");
      }
    });

    // Update mobile links
    navLinksMobile.forEach((link) => {
      link.classList.remove("active"); // Assuming you add an 'active' style for mobile too
      // Check if href exists and matches before adding class
      if (
        link.getAttribute("href") &&
        link.getAttribute("href") === `#${currentSectionId}`
      ) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Set initial active link on load

  // --- Features Carousel Logic ---
  const carousel = document.getElementById("features-carousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dotsContainer = document.getElementById("features-dots");
    // No need for slideWidth calculation if using percentage transform

    let currentIndex = 0;
    let intervalId = null;
    const rotationInterval = 3000; // 3 seconds

    // Check if there are slides before proceeding
    if (slides.length > 0) {
      // Create dots
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`); // Accessibility
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetInterval(); // Reset timer on manual navigation
        });
        dotsContainer.appendChild(dot);
      });

      const dots = Array.from(dotsContainer.children);

      // Function to move to a specific slide
      const goToSlide = (index) => {
        if (index < 0 || index >= slides.length) {
          // console.warn("Invalid slide index:", index);
          // Handle looping: if index is out of bounds, wrap around
          index = (index + slides.length) % slides.length;
        }
        track.style.transform = `translateX(-${index * 100}%)`;
        updateDots(index);
        currentIndex = index;
      };

      // Function to update active dot
      const updateDots = (index) => {
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      };

      // Function for auto-rotation
      const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length; // Loop back to 0
        goToSlide(nextIndex);
      };

      // Start auto-rotation
      const startInterval = () => {
        // Only start if more than one slide
        if (slides.length > 1) {
          if (intervalId) clearInterval(intervalId); // Clear existing interval if any
          intervalId = setInterval(nextSlide, rotationInterval);
        }
      };

      // Reset interval (e.g., after manual click)
      const resetInterval = () => {
        clearInterval(intervalId);
        startInterval();
      };

      // Initialize
      goToSlide(0); // Set initial position
      startInterval(); // Start the rotation

      // Optional: Pause on hover
      carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
      carousel.addEventListener("mouseleave", startInterval);

      // Optional: Add keyboard navigation (basic example)
      carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          goToSlide(currentIndex - 1);
          resetInterval();
        } else if (e.key === "ArrowRight") {
          goToSlide(currentIndex + 1);
          resetInterval();
        }
      });
      // Make carousel focusable for keyboard nav
      carousel.setAttribute("tabindex", "0");
    } else {
      // Handle case where there are no slides (e.g., hide dots container)
      if (dotsContainer) dotsContainer.style.display = "none";
    }
  }
});
