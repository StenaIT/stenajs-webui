import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import pkg from "./package.json";

export default defineConfig({
  plugins: [svgr(), react(), cssInjectedByJsPlugin()],
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      formats: ["cjs", "es"],
      entry: "src/index.ts",
      fileName: (format) => (format === "cjs" ? pkg.main : pkg.module),
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
    },
  },
});
