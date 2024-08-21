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
import { Popover2 } from "./Popover2";
import { PopoverButton } from "./PopoverButton";

export default {
  title: "tooltip/Popover2",
  component: Popover2,
  subcomponents: { PopoverButton, ActionPrompt },
};

export const Standard = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
      content={<ActionPrompt />}
      renderButton={() => <FlatButton leftIcon={stenaTrash} />}
    />
  </Box>
);

export const OnClick = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
      content={<ActionPrompt />}
      renderButton={({ onClick }) => (
        <FlatButton leftIcon={stenaTrash} onClick={onClick} />
      )}
    />
  </Box>
);

export const NoArrow = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
      content={<ActionPrompt />}
      renderButton={({ onClick }) => (
        <FlatButton leftIcon={stenaTrash} onClick={onClick} />
      )}
      arrow={false}
    />
  </Box>
);

export const NoPadding = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
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
      renderButton={({ onClick }) => (
        <FlatButton leftIcon={stenaTrash} onClick={onClick} />
      )}
    />
  </Box>
);

export const Variants = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
      content={<ActionPrompt />}
      renderButton={({ onClick }) => (
        <FlatButton label={"standard"} onClick={onClick} />
      )}
    />

    <Spacing />

    <PopoverButton
      content={<ActionPrompt />}
      renderButton={({ onClick }) => (
        <FlatButton label={"info"} onClick={onClick} />
      )}
      variant={"info"}
    />

    <Spacing />

    <PopoverButton
      content={<Text>Some warning.</Text>}
      variant={"warning"}
      renderButton={({ onClick }) => (
        <FlatButton label={"warning"} onClick={onClick} />
      )}
    />

    <Spacing />

    <PopoverButton
      content={
        <Row>
          <Icon icon={stenaTrash} />
          <Indent />
          <Text>Something went wrong.</Text>
        </Row>
      }
      variant={"error"}
      renderButton={({ onClick }) => (
        <FlatButton label={"error"} onClick={onClick} />
      )}
    />
  </Box>
);

export const ControlOpen = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <Popover2 content={<ActionPrompt />} visible>
      <FlatButton leftIcon={stenaTrash} />
    </Popover2>
  </Box>
);

const Alerter = () => {
  alert("I was rendered.");

  return <Text>I alert when I am rendered.</Text>;
};

export const Lazy = () => (
  <Box indent={10} spacing={10} display={"inline-block"}>
    <PopoverButton
      content={<Alerter />}
      lazy
      renderButton={({ onClick }) => (
        <FlatButton leftIcon={stenaTrash} onClick={onClick} />
      )}
    />
  </Box>
);
