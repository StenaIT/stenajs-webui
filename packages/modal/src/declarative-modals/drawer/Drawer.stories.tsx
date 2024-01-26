import { Box, useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import { PrimaryButton, stenaPlugin } from "@stenajs-webui/elements";
import { Drawer } from "./Drawer";
import { cssColor } from "@stenajs-webui/theme";
import { DrawerHeader } from "./DrawerHeader";

export default {
  title: "modal/Declarative modals/Drawer",
  component: Drawer,
};

export const Standard = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close}>
        <DrawerHeader
          onRequestClose={close}
          header={"Heading"}
          icon={stenaPlugin}
        />
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const CustomWidth = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} width={"600px"}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const CustomBackground = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        onRequestClose={close}
        background={cssColor("--lhds-color-ui-200")}
      >
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const FromRight = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} slideFrom={"right"}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const FromTop = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} slideFrom={"top"}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const FromBottom = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} slideFrom={"bottom"}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const CustomHeight = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        onRequestClose={close}
        slideFrom={"bottom"}
        height={"100px"}
      >
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};

export const WithScroll = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close}>
        <Box background={"#9198e5"} height={"200px"} width={"100%"} />
        <Box background={"#e59198"} height={"200px"} width={"100%"} />
        <Box background={"#94e591"} height={"200px"} width={"100%"} />
        <Box background={"#e5cd91"} height={"200px"} width={"100%"} />
        <Box background={"#91c5e5"} height={"200px"} width={"100%"} />
        <Box background={"#9198e5"} height={"200px"} width={"100%"} />
        <Box background={"#dd91e5"} height={"200px"} width={"100%"} />
        <Box background={"#9ce591"} height={"200px"} width={"100%"} />
      </Drawer>

      <PrimaryButton label={"Open drawer"} onClick={open} />
    </div>
  );
};
