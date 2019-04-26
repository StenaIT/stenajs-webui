import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import centered from '@storybook/addon-centered/react';

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
addDecorator(centered);

configure(loadStories, module);
