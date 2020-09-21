import { Column, Row, Space, StandardText } from "@stenajs-webui/core";
import { FlatButton, Spinner, PrimaryButton } from "@stenajs-webui/elements";
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
  loading,
}) => {
  return (
    <Column position={"relative"}>
      <div style={{ opacity: loading ? 0 : 1 }}>
        <StandardText>{text}</StandardText>
        <Space />
        <Row justifyContent={"flex-end"} alignItems={"center"}>
          <FlatButton label={noLabel} onClick={onNo} />
          <Space />
          <PrimaryButton label={yesLabel} onClick={onYes} />
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
          <Spinner size={"small"} />
        </Row>
      )}
    </Column>
  );
};
