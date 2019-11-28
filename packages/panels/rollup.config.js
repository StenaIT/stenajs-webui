import { createRollupConfig } from "../../rollup.config.provider";
import pkg from "./package.json";

const config = createRollupConfig(pkg, {
  external: ["@emotion/styled", "date-fns"]
});

export default config;
