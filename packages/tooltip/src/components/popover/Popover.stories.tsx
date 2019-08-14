import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Box } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
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
        <Icon icon={faTrash} />
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
          <Icon icon={faTrash} />
        </Popover>
      </Box>
    ),
    { notes: { markdown } }
  )
  .add("action prompt with logic", () => <ActionPromptWithLogic />);
