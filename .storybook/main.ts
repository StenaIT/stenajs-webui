import { dirname, join } from "path";
import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../examples/**/*.stories.tsx",
    "../packages/**/*.stories.tsx",
    "../packages/**/*.mdx",
  ],
  typescript: {
    reactDocgen:
      process.env.NODE_ENV === "production" ? "react-docgen-typescript" : false,
  },

  addons: [
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    getAbsolutePath("@chromatic-com/storybook")
  ],
  viteFinal(config, { configType }) {
    let plugins = [
      svgr({
        svgrOptions: {
          exportType: "named",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ];

    if (configType !== "PRODUCTION") {
      plugins.concat(cssInjectedByJsPlugin({ topExecutionPriority: false }));
    }

    return mergeConfig(config, { plugins });
  },

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {},
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
