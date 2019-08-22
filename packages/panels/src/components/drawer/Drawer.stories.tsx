import { Box } from "@stenajs-webui/core";
import { Drawer } from "@stenajs-webui/panels";
import { boolean, color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("panels/Drawer", module)
  .add("standard", () => (
    <Drawer isOpen={boolean("open", false)}>
      <Box
        background={color("Background color", "#9198e5")}
        spacing={2}
        indent={2}
      >
        Drawer content
      </Box>
    </Drawer>
  ))
  .add("from right", () => (
    <Drawer isOpen={boolean("open", false)} slideFrom={"right"}>
      <Box
        background={color("Background color", "#9198e5")}
        spacing={2}
        indent={2}
      >
        Drawer content
      </Box>
    </Drawer>
  ))
  .add("using portal", () => (
    <Drawer isOpen={boolean("open", false)} portalTarget={document.body}>
      <Box
        background={color("Background color", "#9198e5")}
        spacing={2}
        indent={2}
      >
        Drawer content korv
      </Box>
    </Drawer>
  ));
