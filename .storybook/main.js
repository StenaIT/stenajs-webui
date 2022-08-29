const { mergeConfig } = require("vite");
const svgr = require("vite-plugin-svgr").default;
const cssInjectedByJsPlugin = require("vite-plugin-css-injected-by-js");

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  core: { builder: "@storybook/builder-vite" },
  stories: ["../examples/**/*.stories.tsx", "../packages/**/*.stories.tsx"],
  typescript: {
    reactDocgen:
      process.env.NODE_ENV === "production" ? "react-docgen-typescript" : false,
  },
  addons: [
    "@storybook/addon-viewport",
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
    console.log(configType);
    let plugins = [svgr()];

    if (configType === "PRODUCTION") {
      plugins.push(cssInjectedByJsPlugin({ topExecutionPriority: false }));
    }

    return mergeConfig(config, { plugins });
  },
};
