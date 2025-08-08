/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,ts}", "../../packages/**/*.{ts,svelte}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        glacier: { 500: "#3A8DAD", 900: "#0E2E3A" },
        aurora: { 500: "#5EC8FF" },
        fireweed: { 500: "#D94C8A" },
        gold: { 500: "#E2B857" }
      }
    }
  },
  plugins: []
};