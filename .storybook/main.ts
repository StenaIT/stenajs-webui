import { StorybookViteConfig } from "@storybook/builder-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { mergeConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import svgr from "vite-plugin-svgr";

const config: StorybookViteConfig = {
  core: { builder: "@storybook/builder-vite" },
  stories: ["../examples/**/*.stories.tsx", "../packages/**/*.stories.tsx"],
  typescript: {
    reactDocgen:
      process.env.NODE_ENV === "production" ? "react-docgen-typescript" : false,
  },
  addons: [
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-toolbars",
    "@storybook/addon-postcss",
    {
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  viteFinal(config, { configType }) {
    let plugins = [svgr(), vanillaExtractPlugin()];

    if (configType !== "PRODUCTION") {
      plugins.push(cssInjectedByJsPlugin({ topExecutionPriority: false }));
    }

    return mergeConfig(config, { plugins });
  },
};

export default config;
