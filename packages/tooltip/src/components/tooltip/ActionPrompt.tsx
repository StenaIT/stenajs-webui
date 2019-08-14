import { Column, Row, SmallText, Space } from "@stenajs-webui/core";
import { Progress, SmallButton } from "@stenajs-webui/elements";
import * as React from "react";

interface ActionPromptProps {
  text?: string;
  yesLabel?: string;
  noLabel?: string;
  onYes?: () => void;
  onNo?: () => void;
  loading?: boolean;
}

export const ActionPrompt: React.FC<ActionPromptProps> = ({
  text = "Are you sure?",
  yesLabel = "Yes",
  noLabel = "No",
  onNo,
  onYes,
  loading
}) => {
  return (
    <Column position={"relative"}>
      <div style={{ opacity: loading ? 0 : 1 }}>
        <SmallText>{text}</SmallText>
        <Space />
        <Row justifyContent={"flex-end"}>
          <SmallButton label={noLabel} onClick={onNo} />
          <Space />
          <SmallButton label={yesLabel} onClick={onYes} />
        </Row>
      </div>
      {loading && (
        <Row
          justifyContent={"center"}
          alignItems={"center"}
          left={0}
          top={0}
          width={"100%"}
          height={"100%"}
          position={"absolute"}
        >
          <Progress size={"small"} />
        </Row>
      )}
    </Column>
  );
};
