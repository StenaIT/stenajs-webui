import { mergeConfig } from "vite";

import { createViteConfig } from "../../vite.config.provider";

import pkg from "./package.json";

export default mergeConfig(createViteConfig(pkg), {});
