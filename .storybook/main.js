module.exports = {
  stories: ["../examples/**/*.stories.tsx", "../packages/**/*.stories.tsx"],
  typescript: {
    reactDocgen: process.env.NODE_ENV === "production" ? "react-docgen-typescript" : false,
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
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test?.toString() !== "/\\.css$/"
    );

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: { auto: true },
          },
        },
        "postcss-loader",
      ],
    });

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", "file-loader"],
    });

    // Return the altered config
    return config;
  },
};
