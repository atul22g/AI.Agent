/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
        "tertiary-color-hover": "var(--tertiary-color-hover)",
        "button-color": "vae(--button-color)",
        "text-color": "var(--text-color)",
        "hover-box-color": "var(--hover-box-color)",
        "hover-text-color": "var(--hover-text-color)",
        "code-bg": "var(--code-bg)",
      },
    },
  },
  plugins: [],
}