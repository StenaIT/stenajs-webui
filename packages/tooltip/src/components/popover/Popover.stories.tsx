import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Box } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { ActionPrompt, Popover } from "@stenajs-webui/tooltip";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import markdown from "./Popover.md";

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
  .add("action prompt with logic", () => <ActionPromptWithLogic />);
