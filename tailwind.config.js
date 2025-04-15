/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gradient-start": "#f9a8d4",
        "gradient-middle": "#d8b4fe",
        "gradient-end": "#818cf8",
        "text-primary": "#111827",
        "text-secondary": "#1f2937",
        "button-primary-text": "#4f46e5",
      },
      backgroundColor: {
        "translucent-20": "rgba(255, 255, 255, 0.2)",
        "translucent-30": "rgba(255, 255, 255, 0.3)",
        "translucent-40": "rgba(255, 255, 255, 0.4)",
        "translucent-80": "rgba(255, 255, 255, 0.8)",
        "button-secondary": "rgba(31, 41, 55, 0.5)",
        "button-secondary-hover": "rgba(31, 41, 55, 0.7)",
      },
      borderColor: {
        primary: "rgba(255, 255, 255, 0.3)",
        badge: "rgba(255, 255, 255, 0.5)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease forwards",
        bounce: "bounce 1.5s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "black",
      "coffee",
      {
        glassmorphic: {
          primary: "#4f46e5",
          "primary-focus": "#4338ca",
          "primary-content": "#ffffff",

          secondary: "rgba(31, 41, 55, 0.5)",
          "secondary-focus": "rgba(31, 41, 55, 0.7)",
          "secondary-content": "#ffffff",

          accent: "#d8b4fe",
          "accent-focus": "#c084fc",
          "accent-content": "#ffffff",

          neutral: "#111827",
          "neutral-focus": "#1f2937",
          "neutral-content": "#ffffff",

          "base-100": "rgba(255, 255, 255, 0.2)",
          "base-200": "rgba(255, 255, 255, 0.3)",
          "base-300": "rgba(255, 255, 255, 0.4)",
          "base-content": "#111827",

          info: "#93c5fd",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",

          "--rounded-box": "1rem",
          "--rounded-btn": "1.5rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
    defaultTheme: "light", // 👈 force light theme always
  },
};
