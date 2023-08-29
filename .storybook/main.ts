import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
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
    let plugins = [svgr()];

    if (configType !== "PRODUCTION") {
      plugins.push(cssInjectedByJsPlugin({ topExecutionPriority: false }));
    }

    return mergeConfig(config, { plugins });
  },

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
