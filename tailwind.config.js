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
          DEFAULT: "#003C43",
          dark: "#1A2E35",
        },
        secondary: {
          DEFAULT: "#135D66",
          dark: "#0E3742",
        },
        accent: {
          DEFAULT: "#77B0AA",
          dark: "#4A7A78",
        },
        background: {
          DEFAULT: "#E3FEF7",
          dark: "#1D232A",
        },
        text: {
          DEFAULT: "#333333",
          dark: "#FFFFFF",
        },
      },
      plugins: [forms, typography],
    },
  },
});
