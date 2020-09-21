import { withContexts } from "@storybook/addon-contexts/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters } from "@storybook/react";
import { stenaTheme } from "./stena-theme";
import { contexts } from "./configs/contexts";

import { withA11y } from "@storybook/addon-a11y"; // Must be imported last, otherwise we get weird error.

addParameters({
  options: {
    theme: stenaTheme
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
