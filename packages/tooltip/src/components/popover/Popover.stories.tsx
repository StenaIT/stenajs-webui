import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import {
  Box,
  Column,
  Indent,
  Row,
  SeparatorLine,
  Spacing,
  StandardText
} from "@stenajs-webui/core";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import { ActionPrompt, Popover } from "@stenajs-webui/tooltip";
import * as React from "react";

export default {
  title: "tooltip/Popover"
};

export const Standard = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover content={<ActionPrompt />}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

Standard.storyName = "standard";

export const OnClick = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

OnClick.storyName = "on click";

export const NoArrow = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"} arrow={false}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

NoArrow.storyName = "no arrow";

export const NoPadding = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover
      disablePadding
      content={
        <Column>
          <Indent spacing>
            <StandardText>The line has</StandardText>
          </Indent>
          <SeparatorLine />
          <Indent spacing>
            <StandardText>no padding</StandardText>
          </Indent>
        </Column>
      }
      trigger={"click"}
    >
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

NoPadding.storyName = "no padding";

export const Variants = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"}>
      <FlatButton label={"standard"} />
    </Popover>

    <Spacing />

    <Popover content={<ActionPrompt />} trigger={"click"} variant={"info"}>
      <FlatButton label={"info"} />
    </Popover>

    <Spacing />

    <Popover
      content={<StandardText>Some warning.</StandardText>}
      variant={"warning"}
      trigger={"click"}
    >
      <FlatButton label={"warning"} />
    </Popover>

    <Spacing />

    <Popover
      content={
        <Row>
          <Icon icon={faTrash} />
          <Indent />
          <StandardText>Something went wrong.</StandardText>
        </Row>
      }
      trigger={"click"}
      variant={"error"}
    >
      <FlatButton label={"error"} />
    </Popover>
  </Box>
);

Variants.storyName = "variants";

export const ControlOpen = () => (
  <Box indent={5} spacing={5} display={"inline-block"}>
    <Popover content={<ActionPrompt />} visible>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

ControlOpen.storyName = "control open";
