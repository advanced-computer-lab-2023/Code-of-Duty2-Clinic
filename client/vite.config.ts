import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@emotion/core": "@emotion/react",
      "emotion-theming": "@emotion/react"
    }
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"]
  }
});
