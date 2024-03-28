import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import mkcert from "vite-plugin-mkcert";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    port: 3005,
  },
  define: {
    "process.env": process.env,
  },
});
