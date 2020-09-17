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
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("tooltip/Popover", module)
  .add("standard", () => (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover content={<ActionPrompt />}>
        <FlatButton leftIcon={faTrash} />
      </Popover>
    </Box>
  ))
  .add("on click", () => (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover content={<ActionPrompt />} trigger={"click"}>
        <FlatButton leftIcon={faTrash} />
      </Popover>
    </Box>
  ))
  .add("no arrow", () => (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover content={<ActionPrompt />} trigger={"click"} arrow={false}>
        <FlatButton leftIcon={faTrash} />
      </Popover>
    </Box>
  ))
  .add("no padding", () => (
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
  ))
  .add("variants", () => (
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
  ))
  .add("control open", () => (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover content={<ActionPrompt />} visible>
        <FlatButton leftIcon={faTrash} />
      </Popover>
    </Box>
  ));
