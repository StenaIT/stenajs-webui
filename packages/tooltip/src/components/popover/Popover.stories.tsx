import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Box, LargeText, SmallText } from "@stenajs-webui/core";
import { ActionMenuItem, FlatButton } from "@stenajs-webui/elements";
import { ActionPrompt, Popover } from "@stenajs-webui/tooltip";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import markdown from "./Popover.md";
import { TextInput } from "@stenajs-webui/forms";

const ActionPromptWithLogic: React.FC = () => {
  const [deleting, setDeleting] = useState(false);
  const sendRequest = (onDone: () => void) => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      onDone();
    }, 2000);
  };
  return (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover
        content={({ hide }) => (
          <ActionPrompt
            onYes={() => sendRequest(hide)}
            onNo={hide}
            loading={deleting}
          />
        )}
        trigger={"click"}
      >
        {({ show }) => <FlatButton leftIcon={faTrash} onClick={show} />}
      </Popover>
    </Box>
  );
};
const PopoverWithDynamicContentSize: React.FC = () => {
  const [smallContentVisible, setSmallContentVisible] = useState(false);
  const smallContent = () => {
    return <SmallText>Not much here</SmallText>;
  };
  const largerContent = () => {
    return (
      <Box style={{ height: "300px" }}>
        <LargeText>Here is much more content</LargeText>
        <SmallText>Some text and then empty space...</SmallText>
        <SmallText>Some text and then empty space...</SmallText>
        <SmallText>Some text and then empty space...</SmallText>
        <SmallText>Some text and then empty space...</SmallText>
      </Box>
    );
  };
  return (
    <Box indent={5} spacing={5} display={"inline-block"}>
      <Popover
        placement={"right"}
        content={() => {
          return smallContentVisible ? smallContent() : largerContent();
        }}
        trigger={"click"}
      >
        {({ show, hide }) => (
          <TextInput
            placeholder={"Type to change size"}
            onFocus={show}
            onBlur={hide}
            onChange={() => setSmallContentVisible(!smallContentVisible)}
          />
        )}
      </Popover>
    </Box>
  );
};
storiesOf("tooltip/Popover", module)
  .add(
    "standard",
    () => (
      <Box indent={5} spacing={5} display={"inline-block"}>
        <Popover content={<ActionPrompt />} trigger={"click"}>
          {({ show }) => <FlatButton leftIcon={faTrash} onClick={show} />}
        </Popover>
      </Box>
    ),
    { notes: { markdown } }
  )
  .add(
    "with no padding",
    () => (
      <Box indent={5} spacing={5} display={"inline-block"}>
        <Popover
          disablePadding
          arrowColorHover={"var(--swui-primary-action-color)"}
          content={
            <Box width={"120px"}>
              <ActionMenuItem label={"Save"} />
              <ActionMenuItem label={"Delete"} />
            </Box>
          }
          trigger={"click"}
        >
          {({ show }) => <FlatButton leftIcon={faTrash} onClick={show} />}
        </Popover>
      </Box>
    ),
    { notes: { markdown } }
  )
  .add(
    "using portal",
    () => (
      <Box indent={5} spacing={5} display={"inline-block"}>
        <Popover
          content={<ActionPrompt />}
          trigger={"click"}
          portalTarget={document.body}
        >
          {({ show }) => <FlatButton leftIcon={faInfo} onClick={show} />}
        </Popover>
      </Box>
    ),
    { notes: { markdown } }
  )
  .add("action prompt with logic", () => <ActionPromptWithLogic />)
  .add("popover with dynamic content size", () => (
    <PopoverWithDynamicContentSize />
  ));
