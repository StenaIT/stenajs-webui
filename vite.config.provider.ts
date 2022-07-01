import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export const createViteConfig = (pkg: any) => {
  const externalPackages = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  // Creating regexes of the packages to make sure subpaths of the
  // packages are also treated as external
  const regexesOfPackages = externalPackages.map(
    (packageName) => new RegExp(`^${packageName}(/.*)?`)
  );

  return defineConfig({
    plugins: [svgr(), react(), cssInjectedByJsPlugin()],
    build: {
      emptyOutDir: false,
      sourcemap: true,
      lib: {
        formats: ["cjs", "es"],
        entry: "src/index.ts",
        fileName: (format) =>
          (format === "cjs" ? pkg.main : pkg.module).replace("dist/", ""),
      },
      rollupOptions: {
        external: regexesOfPackages,
      },
    },
  });
};
