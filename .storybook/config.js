import { withBackgrounds } from "@storybook/addon-backgrounds";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { StenaTheme } from "./stena-theme";

import { withA11y } from "@storybook/addon-a11y"; // Must be imported last, otherwise we get weird error.

function loadStories() {
  const req = require.context("../", true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
  // You can require as many stories as you need.
}

addParameters({
  options: {
    theme: StenaTheme
  }
});

addParameters({
  backgrounds: [
    { name: "White", value: "#ffffff", default: true },
    { name: "Dark", value: "#226F81" },
    { name: "Stena blue", value: "#2378cd" },
    { name: "Stena green", value: "#60bd2f" },
    { name: "Twitter", value: "#00aced" },
    { name: "Facebook", value: "#3b5998" }
  ]
});

addDecorator(
  withInfo({
    header: false
  })
);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withBackgrounds);

configure(loadStories, module);
