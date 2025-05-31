import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    ...(react() as any),
    tailwindcss() as any
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});