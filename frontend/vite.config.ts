import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// // Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // increase limit to 1000 kB
  },
});
