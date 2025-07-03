"use strict";

// --- Three.js Scene Setup ---
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize 3D Hero Scene
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true,
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Create particle system
  createParticleSystem();
  
  // Create floating geometric shapes
  createFloatingShapes();
  
  // Start animation loop
  animate();
  
  // Event listeners
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function createParticleSystem() {
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4000;
    
    // Colorful particles
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

function createFloatingShapes() {
  // Create various geometric shapes
  const shapes = [
    { geometry: new THREE.TetrahedronGeometry(50, 0), count: 5 },
    { geometry: new THREE.OctahedronGeometry(40, 0), count: 4 },
    { geometry: new THREE.IcosahedronGeometry(35, 0), count: 3 },
    { geometry: new THREE.DodecahedronGeometry(45, 0), count: 3 }
  ];
  
  shapes.forEach(shapeData => {
    for (let i = 0; i < shapeData.count; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const mesh = new THREE.Mesh(shapeData.geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 2000;
      mesh.position.y = (Math.random() - 0.5) * 2000;
      mesh.position.z = (Math.random() - 0.5) * 2000;
      
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      
      // Store original position and rotation speed
      mesh.userData = {
        originalX: mesh.position.x,
        originalY: mesh.position.y,
        originalZ: mesh.position.z,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02
      };
      
      scene.add(mesh);
    }
  });
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const time = Date.now() * 0.00005;
  
  // Move camera based on mouse
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  
  // Animate particles
  if (particleSystem) {
    particleSystem.rotation.y = time * 0.5;
    particleSystem.rotation.x = time * 0.3;
  }
  
  // Animate geometric shapes
  scene.children.forEach(child => {
    if (child.userData && child.userData.rotSpeedX !== undefined) {
      child.rotation.x += child.userData.rotSpeedX;
      child.rotation.y += child.userData.rotSpeedY;
      child.rotation.z += child.userData.rotSpeedZ;
      
      // Floating motion
      child.position.y = child.userData.originalY + Math.sin(time * 2 + child.userData.originalX * 0.01) * 50;
    }
  });
  
  renderer.render(scene, camera);
}

// --- Portfolio Variables and State ---
let currentFilter = "all";

// Sample Projects Data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React frontend and Node.js backend",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-shopping-cart",
    github: "https://github.com/example/ecommerce",
    demo: "https://demo.example.com",
    details: {
      overview: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Admin dashboard for inventory management",
        "Responsive design for all devices",
      ],
      challenges: "The main challenge was implementing a secure payment system and ensuring the application could handle high traffic loads.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    },
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    category: "web",
    technologies: ["Vue.js", "Socket.io", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-tasks",
    github: "https://github.com/example/taskmanager",
    demo: "https://taskmanager.example.com",
    details: {
      overview: "A real-time collaborative task management application that helps teams organize and track their work efficiently.",
      features: [
        "Real-time collaboration",
        "Task assignment and tracking",
        "Project organization",
        "Team communication",
        "Progress analytics",
        "Mobile responsive design",
      ],
      challenges: "Implementing real-time synchronization across multiple users while maintaining data consistency.",
      technologies: ["Vue.js", "Socket.io", "Node.js", "PostgreSQL", "Redis"],
    },
  },
  {
    id: 3,
    title: "Chat Application",
    description: "Real-time chat application with rooms and file sharing",
    category: "web",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-comments",
    github: "https://github.com/example/chat",
    demo: "https://chat.example.com",
    details: {
      overview: "A real-time chat application with support for multiple rooms and file sharing capabilities.",
      features: [
        "Real-time messaging",
        "Chat rooms",
        "File sharing",
        "User presence indicators",
        "Message history",
        "Emoji support",
      ],
      challenges: "Managing real-time connections efficiently and implementing secure file uploads.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Multer"],
    },
  },
  {
    id: 4,
    title: "Brand Identity Design",
    description: "Complete brand identity package with logo, typography, and color palette",
    category: "2d",
    technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-palette",
    github: "https://github.com/example/brand-identity",
    demo: "https://brand.example.com",
    details: {
      overview: "A comprehensive brand identity design project including logo creation, typography selection, and color palette development.",
      features: [
        "Logo design and variations",
        "Typography system",
        "Color palette development",
        "Brand guidelines",
        "Business card design",
        "Letterhead templates",
      ],
      challenges: "Creating a cohesive brand identity that works across all mediums while maintaining visual appeal.",
      technologies: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"],
    },
  },
  {
    id: 5,
    title: "UI/UX Mobile App Design",
    description: "Modern mobile app interface design with user experience focus",
    category: "2d",
    technologies: ["Figma", "Adobe XD", "Principle"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-mobile-alt",
    github: "https://github.com/example/mobile-ui",
    demo: "https://mobile-ui.example.com",
    details: {
      overview: "A modern mobile application interface design focusing on user experience and accessibility.",
      features: [
        "User-centered design approach",
        "Interactive prototypes",
        "Accessibility considerations",
        "Design system creation",
        "User flow optimization",
        "Responsive layouts",
      ],
      challenges: "Balancing visual appeal with usability while ensuring the design works across different screen sizes.",
      technologies: ["Figma", "Adobe XD", "Principle", "Sketch"],
    },
  },
  {
    id: 6,
    title: "Poster & Print Design",
    description: "Creative poster designs for events and marketing campaigns",
    category: "2d",
    technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-image",
    github: "https://github.com/example/poster-design",
    demo: "https://posters.example.com",
    details: {
      overview: "Creative poster and print design projects for various events and marketing campaigns.",
      features: [
        "Event poster design",
        "Marketing materials",
        "Print-ready formats",
        "Typography focus",
        "Visual hierarchy",
        "Brand integration",
      ],
      challenges: "Creating eye-catching designs that effectively communicate the message while maintaining brand consistency.",
      technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
    },
  },
  {
    id: 7,
    title: "3D Product Visualization",
    description: "Photorealistic 3D product renders for e-commerce and marketing",
    category: "3d",
    technologies: ["Blender", "Cinema 4D", "KeyShot"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-cube",
    github: "https://github.com/example/3d-product",
    demo: "https://3d-product.example.com",
    details: {
      overview: "Photorealistic 3D product visualization for e-commerce platforms and marketing materials.",
      features: [
        "Photorealistic rendering",
        "Multiple viewing angles",
        "Material accuracy",
        "Lighting optimization",
        "Animation sequences",
        "AR-ready models",
      ],
      challenges: "Achieving photorealistic quality while maintaining efficient render times and file sizes.",
      technologies: ["Blender", "Cinema 4D", "KeyShot", "Substance Painter"],
    },
  },
  {
    id: 8,
    title: "Architectural 3D Modeling",
    description: "Detailed 3D architectural models and interior visualizations",
    category: "3d",
    technologies: ["SketchUp", "3ds Max", "V-Ray"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-building",
    github: "https://github.com/example/architecture-3d",
    demo: "https://architecture-3d.example.com",
    details: {
      overview: "Detailed 3D architectural modeling and interior visualization for residential and commercial projects.",
      features: [
        "Detailed architectural models",
        "Interior design visualization",
        "Realistic lighting",
        "Material libraries",
        "Virtual walkthroughs",
        "Technical drawings",
      ],
      challenges: "Balancing architectural accuracy with visual appeal while managing complex lighting scenarios.",
      technologies: ["SketchUp", "3ds Max", "V-Ray", "AutoCAD"],
    },
  },
  {
    id: 9,
    title: "Character Design & Animation",
    description: "3D character creation and animation for games and media",
    category: "3d",
    technologies: ["Blender", "Maya", "ZBrush"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "fas fa-user-ninja",
    github: "https://github.com/example/character-design",
    demo: "https://character-design.example.com",
    details: {
      overview: "3D character design and animation for games, films, and interactive media.",
      features: [
        "Character modeling",
        "Rigging and animation",
        "Texture painting",
        "Facial animation",
        "Game-ready optimization",
        "Motion capture integration",
      ],
      challenges: "Creating appealing characters while maintaining technical constraints for real-time applications.",
      technologies: ["Blender", "Maya", "ZBrush", "Substance Painter"],
    },  }
];

// Initialize the application
document.addEventListener("DOMContentLoaded", function() {
  initHeroScene();
  initializePortfolio();
  initTypingEffect();
  initCarousel();
});

function initializePortfolio() {
  // Load initial projects
  loadProjects();
  
  // Set up event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Smooth scroll navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Navbar scroll effect and active link highlighting
  window.addEventListener('scroll', handleScroll);

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Category filters
  const categoryChips = document.querySelectorAll('.chip');
  categoryChips.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      const filter = e.target.getAttribute("data-filter");
      filterProjects(filter);
    });
  });

  // Project details panel
  const closeDetailsPanel = document.getElementById('close-details-panel');
  const overlay = document.getElementById('overlay');
  
  if (closeDetailsPanel) {
    closeDetailsPanel.addEventListener("click", closeProjectDetails);
  }
  
  if (overlay) {
    overlay.addEventListener("click", closeProjectDetails);
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
}

function handleScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Active link highlighting
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('#theme-toggle i');
  
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    if (themeIcon) themeIcon.className = "fas fa-sun";
  } else {
    if (themeIcon) themeIcon.className = "fas fa-moon";
  }
}

function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  projectsGrid.innerHTML = "";
  const filteredProjects = currentFilter === "all" ? projects : projects.filter(p => p.category === currentFilter);
  
  filteredProjects.forEach((project) => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-overlay">
        <div class="project-icon">
          <i class="${project.icon}"></i>
        </div>
      </div>
    </div>
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-actions">
        <button class="btn-icon" onclick="openProjectDetails(${project.id})" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <a href="${project.github}" target="_blank" class="btn-icon" title="View Code">
          <i class="fab fa-github"></i>
        </a>
        <a href="${project.demo}" target="_blank" class="btn-icon" title="Live Demo">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  `;
  
  return card;
}

function filterProjects(filter) {
  currentFilter = filter;
  
  // Update active chip
  const categoryChips = document.querySelectorAll('.chip');
  categoryChips.forEach(chip => {
    chip.classList.remove("active");
    if (chip.getAttribute("data-filter") === filter) {
      chip.classList.add("active");
    }
  });
  
  loadProjects();
}

function openProjectDetails(projectId) {
  const project = projects.find(p => p.id === projectId);
  const projectDetailsPanel = document.getElementById('project-details-panel');
  const projectDetailsContent = document.getElementById('project-details-content');
  const overlay = document.getElementById('overlay');
  
  if (!project || !projectDetailsPanel || !projectDetailsContent) return;
  projectDetailsContent.innerHTML = `
    <div class="project-detail-header">
      <div class="project-detail-icon">
        <i class="${project.icon}"></i>
      </div>
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </div>
    
    <div class="project-detail-section">
      <h4>Overview</h4>
      <p>${project.details.overview}</p>
    </div>
    
    <div class="project-detail-section">
      <h4>Key Features</h4>
      <ul>
        ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    
    <div class="project-detail-section">
      <h4>Technologies Used</h4>
      <div class="tech-list">
        ${project.details.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
    
    <div class="project-detail-section">
      <h4>Challenges & Solutions</h4>
      <p>${project.details.challenges}</p>
    </div>
    
    <div class="project-links">
      <a href="${project.github}" target="_blank" class="btn btn-primary">
        <i class="fab fa-github"></i> View Code
      </a>
      <a href="${project.demo}" target="_blank" class="btn btn-secondary">
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>
    </div>
  `;

  projectDetailsPanel.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectDetails() {
  const projectDetailsPanel = document.getElementById('project-details-panel');
  const overlay = document.getElementById('overlay');
  
  if (projectDetailsPanel) {
    projectDetailsPanel.classList.remove("active");
  }
  if (overlay) {
    overlay.classList.remove("active");
  }
  document.body.style.overflow = "auto";
}

function handleContactForm(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // Here you would typically send the data to your backend
  console.log('Contact form submission:', data);
  
  // Show success message (you can customize this)
  alert('Thank you for your message! I\'ll get back to you soon.');
    // Reset form
  e.target.reset();
}

// --- Hero Name Typing Effect ---
function initTypingEffect() {
  const heroNameElement = document.getElementById('hero-name-typing');
  if (!heroNameElement) return;
  
  const textToType = 'Ming Jie';
  let currentIndex = 0;
  let hasStarted = false;
  
  function startTyping() {
    if (hasStarted) return;
    hasStarted = true;
    
    // Add typing class for cursor animation
    heroNameElement.classList.add('typing');
      function typeCharacter() {
      if (currentIndex < textToType.length) {
        const currentChar = textToType[currentIndex];
        heroNameElement.textContent += currentChar;
        currentIndex++;
        
        // Slower typing speed for more deliberate effect
        let typingSpeed = Math.random() * 150 + 150; // Base speed: 150-300ms
        
        // Add longer pause after space for more natural typing
        if (currentChar === ' ') {
          typingSpeed = Math.random() * 250 + 200; // 200-450ms for space
        }
        
        setTimeout(typeCharacter, typingSpeed);      } else {
        // Typing complete - remove typing class
        heroNameElement.classList.remove('typing');
        heroNameElement.classList.add('typing-complete');
      }
    }
    
    // Start typing after a short delay
    setTimeout(() => {
      typeCharacter();
    }, 800); // 0.8 second delay before starting
  }
  
  // Check if hero section is visible, if not wait for scroll
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          startTyping();
          observer.unobserve(heroSection); // Stop observing after starting
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(heroSection);
    
    // Also start immediately if already visible
    setTimeout(() => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        startTyping();
      }
    }, 500);
  }
}

// Make functions globally available
window.openProjectDetails = openProjectDetails;
window.closeProjectDetails = closeProjectDetails;

// --- Carousel Functionality ---
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  
  if (!track || !prevBtn || !nextBtn || !indicatorsContainer) return;
  
  // Randomize the order of slides
  function shuffleSlides() {
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    
    // Fisher-Yates shuffle algorithm
    for (let i = slides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slides[i], slides[j]] = [slides[j], slides[i]];
    }
    
    // Clear the track and re-append shuffled slides
    track.innerHTML = '';
    slides.forEach(slide => track.appendChild(slide));
    
    return slides;
  }
  
  // Shuffle the slides on initialization
  shuffleSlides();
  
  const slides = track.querySelectorAll('.carousel-slide');
  const slideCount = slides.length;
  let currentSlide = 0;
  
  // Create indicators
  for (let i = 0; i < slideCount; i++) {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
  }
  
  const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
  
  function updateCarousel() {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-play functionality (optional)
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause auto-play on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 1000); // Restart auto-play after 1 second
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 1000);
    }
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    isDragging = false;
    setTimeout(startAutoPlay, 1000);
  });
}
