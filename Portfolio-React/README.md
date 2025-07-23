# Portfolio React - Modern Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a professional design with interactive 3D elements, smooth animations, and comprehensive showcasing of skills and projects.

## ✨ Features

### 🎨 Design & UX
- **Modern Professional Design**: Clean, modern interface with blue/slate color scheme
- **Responsive Layout**: Optimized for all devices with improved mobile navigation
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Loading States**: Skeleton loaders for images and content
- **Visual Hierarchy**: Improved typography and spacing throughout

### 🚀 Interactive Elements
- **3D Hero Section**: Interactive floating tech icons with particle system
- **Project Modal System**: Detailed project views with technologies and features
- **Contact Form**: Functional form with EmailJS integration and status feedback
- **Category Filtering**: Dynamic project filtering by type (2D, 3D, Web Apps)

### 📱 Navigation & Accessibility  
- **Sidebar Navigation**: Fixed sidebar with contact information (desktop)
- **Mobile-First Navigation**: Horizontal top bar with hamburger menu (mobile)
- **Keyboard Navigation**: Full keyboard support with focus states
- **Theme Toggle**: Dark/light mode switching capability

### 🛠️ Technical Features
- **Component Architecture**: Reusable components (ImageLoader, ScrollReveal)
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Image lazy loading and optimized renders
- **Modern Build Tools**: Vite for fast development and building

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type safety and better development experience  
- **Vite** - Fast build tool and development server
- **Framer Motion** - Smooth animations and transitions

### 3D Graphics & UI
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Lucide React** - Beautiful, customizable icons

### Communication & Forms
- **EmailJS** - Contact form email functionality
- **Form Validation** - Client-side validation with status feedback

## 🏗️ Getting Started

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

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Responsive navigation with mobile menu
│   ├── HeroSection.tsx      # 3D hero with floating tech icons
│   ├── About.tsx            # About section with skills showcase
│   ├── Projects.tsx         # Projects grid with modal details
│   ├── Contact.tsx          # Functional contact form
│   ├── ImageLoader.tsx      # Image component with loading states
│   ├── ScrollReveal.tsx     # Scroll-triggered animation wrapper
│   └── *.css               # Component-specific styles
├── assets/                 # Static assets and images
├── App.tsx                 # Main application component
├── App.css                 # Global styles and responsive design
└── main.tsx               # Application entry point
```

## 🎯 Key Improvements Made

### Visual & UX Enhancements
- ✅ **Typography Standardization**: Consistent font family across all components
- ✅ **Color Palette Modernization**: Professional blue/slate theme replacing red
- ✅ **Mobile Navigation**: Proper hamburger menu replacing hover-to-expand
- ✅ **Visual Hierarchy**: Improved spacing and typography scales
- ✅ **Loading Experience**: Skeleton loaders for all images

### Technical Enhancements  
- ✅ **Scroll Animations**: Framer Motion integration for smooth reveal effects
- ✅ **Image Optimization**: ImageLoader component with error handling
- ✅ **Form Functionality**: EmailJS integration with status feedback
- ✅ **Accessibility**: Focus states and keyboard navigation support
- ✅ **Responsive Design**: Optimized breakpoints and mobile experience

### Skills Showcase
- **Design & Media**: Adobe Photoshop, After Effects, Blender, Unreal Engine
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, MongoDB, PostgreSQL, Prisma ORM

## 📱 Responsive Breakpoints

- **Desktop**: `> 1024px` - Full sidebar navigation (280px width)
- **Tablet**: `768px - 1024px` - Reduced sidebar (260px width)  
- **Mobile**: `< 768px` - Top horizontal navigation with hamburger menu
- **Small Mobile**: `< 480px` - Optimized spacing and typography

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle  
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📧 Contact Form Setup

To enable the contact form functionality:

1. **Create EmailJS Account**: Sign up at [emailjs.com](https://www.emailjs.com/)
2. **Get Credentials**: Obtain your Service ID, Template ID, and Public Key
3. **Update Contact.tsx**: Replace the placeholder values in the `handleSubmit` function
4. **Configure Template**: Set up your email template in EmailJS dashboard

## 🎨 Customization

### Color Scheme
The color palette uses CSS custom properties defined in `App.css`:
- **Primary**: Blue tones (`#3b82f6`, `#60a5fa`)
- **Secondary**: Slate tones (`#1e293b`, `#334155`)  
- **Accent Colors**: Purple (`#8b5cf6`), Amber (`#f59e0b`), Green (`#10b981`)

### Adding New Projects
Update the `projects` array in `Projects.tsx` with:
- Project details (title, description, image)
- Technologies used
- Live demo and GitHub links
- Additional project images

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

---

**Built with ❤️ by Ming Jie** - A creative technologist transitioning to Full-Stack Development