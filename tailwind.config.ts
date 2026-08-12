import type { Config } from "tailwindcss";

// Los valores de color/tipografía viven como CSS custom properties en
// src/app/globals.css (mismos tokens que ya tenía el sitio en vanilla CSS).
// Tailwind solo los referencia — así el archivo de tokens sigue siendo la
// única fuente de verdad de la identidad de marca, igual que antes.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "azul-deep": "var(--azul-deep)",
        "azul-mid": "var(--azul-mid)",
        "azul-accent": "var(--azul-accent)",
        "azul-light": "var(--azul-light)",
        sand: "var(--sand)",
        "sand-light": "var(--sand-light)",
        "text-dark": "var(--text-dark)",
        "text-mid": "var(--text-mid)",
        "text-light": "var(--text-light)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        container: "var(--max-width)",
      },
    },
  },
  plugins: [],
};

export default config;
