import {
  Box,
  Column,
  Indent,
  Row,
  SeparatorLine,
  Spacing,
  Text,
} from "@stenajs-webui/core";
import { FlatButton, Icon, stenaTrash } from "@stenajs-webui/elements";
import * as React from "react";
import { ActionPrompt } from "./ActionPrompt";
import { Popover } from "./Popover";

export default {
  title: "tooltip/Popover",
  component: Popover,
  subcomponents: { ActionPrompt },
};

export const Standard = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      renderTrigger={(props) => <FlatButton leftIcon={stenaTrash} {...props} />}
    >
      <ActionPrompt />
    </Popover>
  </Box>
);

export const CloseAfterEvent = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      renderTrigger={(props) => <FlatButton leftIcon={stenaTrash} {...props} />}
    >
      {({ onRequestClose }) => (
        <ActionPrompt onNo={onRequestClose} onYes={onRequestClose} />
      )}
    </Popover>
  </Box>
);

export const OnClick = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      trigger={"click"}
      renderTrigger={(props) => <FlatButton leftIcon={stenaTrash} {...props} />}
    >
      <ActionPrompt />
    </Popover>
  </Box>
);

export const NoArrow = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      trigger={"click"}
      renderTrigger={(props) => <FlatButton leftIcon={stenaTrash} {...props} />}
      hideArrow
    >
      <ActionPrompt />
    </Popover>
  </Box>
);

export const NoPadding = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      disablePadding
      trigger={"click"}
      renderTrigger={(props) => <FlatButton leftIcon={stenaTrash} {...props} />}
    >
      <Column>
        <Indent spacing>
          <Text>The line has</Text>
        </Indent>
        <SeparatorLine />
        <Indent spacing>
          <Text>no padding</Text>
        </Indent>
      </Column>
    </Popover>
  </Box>
);

export const Variants = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover
      renderTrigger={(props) => <FlatButton label={"standard"} {...props} />}
    >
      <ActionPrompt />
    </Popover>

    <Spacing />

    <Popover
      renderTrigger={(props) => <FlatButton label={"info"} {...props} />}
      variant={"info"}
    >
      <ActionPrompt />
    </Popover>

    <Spacing />

    <Popover
      variant={"warning"}
      renderTrigger={(props) => <FlatButton label={"warning"} {...props} />}
    >
      <Text>Some warning.</Text>
    </Popover>

    <Spacing />

    <Popover
      variant={"error"}
      renderTrigger={(props) => <FlatButton label={"error"} {...props} />}
    >
      <Row>
        <Icon icon={stenaTrash} />
        <Indent />
        <Text>Something went wrong.</Text>
      </Row>
    </Popover>
  </Box>
);
