import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, configure } from "@storybook/react";

function loadStories() {
  const req = require.context("../packages", true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
  // You can require as many stories as you need.
}

addDecorator(
  withInfo({
    header: false
  })
);
addDecorator(withKnobs);

configure(loadStories, module);
