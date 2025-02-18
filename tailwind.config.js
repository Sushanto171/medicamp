import withMT from "@material-tailwind/react/utils/withMT";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003C43", // Light Mode Primary
          dark: "#1A2E35", // Dark Mode Primary
        },
        secondary: {
          DEFAULT: "#135D66", // Light Mode Secondary
          dark: "#0E3742", // Dark Mode Secondary
        },
        accent: {
          DEFAULT: "#77B0AA", // Light Mode Accent
          dark: "#4A7A78", // Dark Mode Accent
        },
        background: {
          DEFAULT: "#E3FEF7", // Light Mode Background
          dark: "#1D232A", // Dark Mode Background
        },
        text: {
          DEFAULT: "#333333", // Light Mode Text
          dark: "#FFFFFF", // Dark Mode Text
        },
      },
      plugins: [forms, typography],
    },
  },
});
