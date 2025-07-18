# Portfolio React - Modern Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This is a conversion of the original HTML/CSS/JS portfolio to a Single Page Application (SPA) using modern web technologies.

## νΊ Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite for optimal performance
- **3D Hero Section**: Interactive 3D particle system and floating shapes using Three.js and React Three Fiber
- **Responsive Design**: Fully responsive layout that works on all devices
- **Image Carousel**: Smooth, touch-friendly image gallery with auto-play functionality
- **Video Showcase**: Integrated video player for reel presentation
- **Dark/Light Theme**: Theme toggle with smooth transitions
- **Contact Form**: Functional contact form with validation
- **Project Filtering**: Interactive project filtering by category
- **Smooth Animations**: Smooth transitions and hover effects throughout
- **Modern UI Components**: Clean, modern design with glassmorphism effects

## ν» οΈ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Lucide React** - Beautiful, customizable icons

## νΊ Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## ν³ Project Structure

```
src/
βββ components/
β   βββ Navbar.tsx           # Navigation component with theme toggle
β   βββ HeroSection.tsx      # 3D hero section with Three.js
β   βββ VideoReel.tsx        # Video showcase component
β   βββ Gallery2D.tsx        # Responsive image carousel
β   βββ About.tsx            # About and skills section
β   βββ Projects.tsx         # Projects grid with filtering
β   βββ Contact.tsx          # Contact form component
β   βββ *.css               # Component-specific styles
βββ App.tsx                 # Main application component
βββ App.css                 # Global styles and theme variables
βββ main.tsx               # Application entry point
```

## νΎ― Migration Benefits

### From HTML/CSS/JS to React SPA

1. **Better State Management**: React's state management makes theme switching and carousel navigation more reliable
2. **Component Reusability**: UI components can be easily reused and extended
3. **Improved Performance**: Virtual DOM and optimized re-renders
4. **Modern Development**: Hot reloading, TypeScript support, and modern tooling
5. **Scalability**: Easy to add new sections, features, and functionality
6. **Maintainability**: Better code organization and separation of concerns

## νΊ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
