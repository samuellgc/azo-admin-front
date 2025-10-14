/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});