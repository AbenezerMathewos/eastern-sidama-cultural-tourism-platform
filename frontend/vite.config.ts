import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // ────────────────────────────────────────────────
    // NEW: Proxy setup – all /api requests go to backend
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        // Keep /api in the path (your backend expects /api/v1/...)
        rewrite: (path) => path,   // no change needed here
      },
    },
    // ────────────────────────────────────────────────
  },

  plugins: [react()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));