const storysource = require.resolve("@storybook/source-loader");
const path = require("path");

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [{ loader: storysource, options: { parser: "typescript" } }],
    include: path.resolve(__dirname, "../"),
    enforce: "pre"
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
