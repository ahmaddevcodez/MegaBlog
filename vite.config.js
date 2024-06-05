import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true, // Ensure source maps are generated in production build
  },
  css: {
    devSourcemap: true, // Enable source maps for CSS in development
  },
});
