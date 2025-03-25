import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct base path for deployment
  build: {
    outDir: "dist", // Ensure Vercel serves from "dist"
  },
  server: {
    port: 5173, // Local dev port
  },
});
