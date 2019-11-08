import { withContexts } from '@storybook/addon-contexts/react';
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { StenaTheme } from "./stena-theme";
import { contexts } from './configs/contexts';

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

addDecorator(
  withInfo({
    header: false
  })
);

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withContexts(contexts));

configure(loadStories, module);
