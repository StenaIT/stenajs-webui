import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";
const postcssPresetEnv = require('postcss-preset-env');

export default {
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
      plugins: [postcssPresetEnv({ stage: 0 })],
      modules: true
    }),
    external({
      includeDependencies: true
    }),
    url(),
    svgr(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs()
  ]
};
