/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        patriot: ["Patriot", "sans-serif"],
        neue: ["Neue", "sans-serif"],
      },
      colors: {
        "primary-color": "var(--primary-color)", // Primary Blue
        "secondary-color": "var(--secondary-color)", // Warm Purple
        "accent-color": "var(--accent-color)", // Vibrant Purple
        "border-color": "var(--border-color)", // Border Color
        "neutral-color": "var(--neutral-color)", // Neutral Gray

        "background-color": "var(--background-color)", // Background Color
        "text-color": "var(--text-color)", // Primary Text Color
        "text-secondary-color": "var(--secondary-text-color)", // Primary Text Color

        "danger-color": "var(--danger-color)", // Error Red
        "danger-dark-color": "var(--danger-dark-color)", // Error Dark Red
        "success-color": "var(--success-color)", // Success Green
        "success-dark-color": "var(--success-dark-color)", // Success Dark Green
        "warning-color": "var(--warning-color)", // Warning Yellow
      },
    },
  },
  plugins: [],
};
