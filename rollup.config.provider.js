import svgr from "@svgr/rollup";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import url from "rollup-plugin-url";

export const createRollupConfig = (pkg, options) => ({
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      plugins: [require("autoprefixer"), require("postcss-nested")],
      modules: true
    }),
    external({
      includeDependencies: true
    }),
    url(),
    svgr(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      typescript: require("typescript")
    }),
    commonjs()
  ],
  ...options
});
