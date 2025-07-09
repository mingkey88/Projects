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
  }

  init() {
    if (!this.canvas) return;

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
    this.renderer.setClearColor(0x000000, 0);

    this.createParticles();
    this.createQuestItems();
    this.createLights();
    this.bindEvents();
    this.animate();
  }

  createParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Color (pink/purple theme)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 0.25; // G
        colors[i * 3 + 2] = 0.5; // B (pink)
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.5; // R
        colors[i * 3 + 1] = 0; // G
        colors[i * 3 + 2] = 1; // B (purple)
      } else {
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 1; // G
        colors[i * 3 + 2] = 1; // B (white)
      }

      // Size
      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Add floating animation
          mvPosition.y += sin(time + position.x * 0.5) * 0.5;
          mvPosition.x += cos(time + position.z * 0.3) * 0.3;
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - (dist * 2.0);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createQuestItems() {
    const questGeometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 8, 6),
      new THREE.ConeGeometry(0.3, 0.6, 6),
      new THREE.OctahedronGeometry(0.4)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0xff4081, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x8e24aa, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x3f51b5, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x00bcd4, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      })
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = questGeometries[Math.floor(Math.random() * questGeometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      // Position randomly around the scene
      mesh.position.x = (Math.random() - 0.5) * 15;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      // Store original position for animation
      mesh.originalPosition = mesh.position.clone();

      this.questItems.push(mesh);
      this.scene.add(mesh);
    }
  }

  createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Point lights
    const light1 = new THREE.PointLight(0xff4081, 1, 100);
    light1.position.set(5, 5, 5);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0x8e24aa, 1, 100);
    light2.position.set(-5, -5, 5);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0x3f51b5, 0.8, 100);
    light3.position.set(0, 0, -5);
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
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    // Update particle shader time
    if (this.particles.material.uniforms) {
      this.particles.material.uniforms.time.value = time;
    }

    // Animate quest items
    this.questItems.forEach((item, index) => {
      item.rotation.x += 0.01 + index * 0.002;
      item.rotation.y += 0.015 + index * 0.001;
      
      // Floating motion
      const offset = index * 0.5;
      item.position.y = item.originalPosition.y + Math.sin(time + offset) * 0.5;
      item.position.x = item.originalPosition.x + Math.cos(time * 0.8 + offset) * 0.3;
    });

    // Smooth camera movement based on mouse
    this.targetRotationX = this.mouseY * 0.2;
    this.targetRotationY = this.mouseX * 0.2;
    
    this.camera.rotation.x += (this.targetRotationX - this.camera.rotation.x) * 0.05;
    this.camera.rotation.y += (this.targetRotationY - this.camera.rotation.y) * 0.05;

    // Rotate particle system
    this.particles.rotation.y += 0.002;
    this.particles.rotation.x += 0.001;

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
