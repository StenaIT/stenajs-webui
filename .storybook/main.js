module.exports = {
  stories: ["../**/*.stories.tsx"],
  addons: [
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-toolbars",
    "@storybook/addon-docs",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
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
            modules: true,
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
