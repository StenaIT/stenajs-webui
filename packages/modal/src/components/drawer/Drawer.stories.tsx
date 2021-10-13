import { Box, Heading, Row, useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import { PrimaryButton } from "@stenajs-webui/elements";
import { Drawer } from "./Drawer";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "modal/Drawer",
  component: Drawer,
};

export const Standard = () => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open"} onClick={open} />
      <Row justifyContent={"center"} spacing={8}>
        <Heading>This will be below the overlay.</Heading>
      </Row>
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
      <PrimaryButton label={"Open"} onClick={open} />
      <Row justifyContent={"center"} spacing={8}>
        <Heading>This will be below the overlay.</Heading>
      </Row>
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
      <PrimaryButton label={"Open"} onClick={open} />
      <Row justifyContent={"center"} spacing={8}>
        <Heading>This will be below the overlay.</Heading>
      </Row>
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
      <PrimaryButton label={"Open"} onClick={open} />
      <Row justifyContent={"center"} spacing={8}>
        <Heading>This will be below the overlay.</Heading>
      </Row>
    </div>
  );
};
