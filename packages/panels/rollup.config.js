import svgr from "@svgr/rollup";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import url from "rollup-plugin-url";

import pkg from "./package.json";

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
  external: ["@emotion/styled", "date-fns"],
  plugins: [
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
  ]
};
