import { createRollupConfig } from "../../rollup.config.provider";
import pkg from "./package.json";

const config = createRollupConfig(pkg);

export default config;
