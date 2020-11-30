import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import {
  Box,
  Column,
  Indent,
  Row,
  SeparatorLine,
  Spacing,
  Text,
} from "@stenajs-webui/core";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { Popover } from "./Popover";
import { ActionPrompt } from "./ActionPrompt";

export default {
  title: "tooltip/Popover",
  component: Popover,
  subcomponents: { ActionPrompt },
};

export const Standard = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<ActionPrompt />}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

export const OnClick = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

export const NoArrow = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"} arrow={false}>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

export const NoPadding = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      disablePadding
      content={
        <Column>
          <Indent spacing>
            <Text>The line has</Text>
          </Indent>
          <SeparatorLine />
          <Indent spacing>
            <Text>no padding</Text>
          </Indent>
        </Column>
      }
      trigger={"click"}
    >
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

export const Variants = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<ActionPrompt />} trigger={"click"}>
      <FlatButton label={"standard"} />
    </Popover>

    <Spacing />

    <Popover content={<ActionPrompt />} trigger={"click"} variant={"info"}>
      <FlatButton label={"info"} />
    </Popover>

    <Spacing />

    <Popover
      content={<Text>Some warning.</Text>}
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
          <Text>Something went wrong.</Text>
        </Row>
      }
      trigger={"click"}
      variant={"error"}
    >
      <FlatButton label={"error"} />
    </Popover>
  </Box>
);

export const ControlOpen = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<ActionPrompt />} visible>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);

const Alerter = () => {
  alert("I was rendered.");

  return <Text>I alert when I am rendered.</Text>;
};

export const Lazy = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover content={<Alerter />} trigger={"click"} lazy>
      <FlatButton leftIcon={faTrash} />
    </Popover>
  </Box>
);
