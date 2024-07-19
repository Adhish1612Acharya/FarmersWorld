import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// import path from "path";

// // Load environment variables from .env file
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// // Log the variable to verify it's being loaded
// console.log("VITE_API_URL:", process.env.VITE_API_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
