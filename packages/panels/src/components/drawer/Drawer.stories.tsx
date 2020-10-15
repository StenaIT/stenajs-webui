import { Box } from "@stenajs-webui/core";
import { Drawer } from "@stenajs-webui/panels";
import { boolean, number } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "panels/Drawer",
};

export const Standard = () => (
  <Drawer isOpen={boolean("open", false)} width={`${number("width", 400)}px`}>
    <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
      Drawer content
    </Box>
  </Drawer>
);

export const FromRight = () => (
  <Drawer isOpen={boolean("open", false)} slideFrom={"right"}>
    <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
      Drawer content
    </Box>
  </Drawer>
);

export const UsingPortal = () => (
  <Drawer isOpen={boolean("open", false)} portalTarget={document.body}>
    <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
      Drawer content
    </Box>
  </Drawer>
);
