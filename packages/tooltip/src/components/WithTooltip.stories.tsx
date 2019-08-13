import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Box, Row, StandardText } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { ActionPrompt, WithTooltip } from "@stenajs-webui/tooltip";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";

const ActionPromptWithLogic: React.FC = () => {
  const [deleting, setDeleting] = useState(false);

  const sendRequest = (onDone: () => void) => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      onDone();
    }, 100000);
  };

  return (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <WithTooltip
        content={({ hide }) => (
          <ActionPrompt
            onYes={() => sendRequest(hide)}
            onNo={hide}
            loading={deleting}
          />
        )}
        trigger={"click"}
      >
        <Icon icon={faTrash} />
      </WithTooltip>
    </Box>
  );
};

storiesOf("tooltip/WithTooltip", module)
  .add("standard", () => (
    <>
      <Row justifyContent={"space-between"} spacing={10}>
        <WithTooltip
          placement={"bottom"}
          content={<StandardText>Nice content on bottom</StandardText>}
        >
          <StandardText>Hover me</StandardText>
        </WithTooltip>
        <WithTooltip
          placement={"left"}
          content={<StandardText>Nice content on left</StandardText>}
        >
          <StandardText>Hover me</StandardText>
        </WithTooltip>
        <WithTooltip
          placement={"right"}
          content={<StandardText>Nice content on right</StandardText>}
        >
          <StandardText>Hover me</StandardText>
        </WithTooltip>
        <div />
      </Row>
      <Row justifyContent={"center"}>
        <WithTooltip
          placement={"top"}
          content={<StandardText>Nice content on top</StandardText>}
        >
          <StandardText>Hover me</StandardText>
        </WithTooltip>
      </Row>
    </>
  ))
  .add("click trigger", () => (
    <WithTooltip
      content={<StandardText>Nice content on bottom</StandardText>}
      trigger={"click"}
    >
      <StandardText>Click me</StandardText>
    </WithTooltip>
  ))
  .add("action prompt", () => (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <WithTooltip content={<ActionPrompt />} trigger={"click"}>
        <Icon icon={faTrash} />
      </WithTooltip>
    </Box>
  ))
  .add("action prompt with logic", () => <ActionPromptWithLogic />);
