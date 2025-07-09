/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4338ca',
        'primary-hover': '#3730a3',
        'secondary': '#fb7185',
        'secondary-hover': '#f43f5e',
        'background': '#f9fafb',
        'card': '#ffffff',
        'card-hover': '#f3f4f6',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
  safelist: [
    'left-0', 'top-0', 'right-0', 'bottom-0',
    'fixed', 'absolute', 'relative', 'sticky',
    'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    'transform', '-translate-y-1/2', 'translate-y-[-4px]',
    'active', 'work', 'personal', 'community', 'learning', 'other'
  ]
}