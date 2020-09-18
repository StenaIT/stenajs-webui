import { Indent, StandardText } from "@stenajs-webui/core";
import * as React from "react";

interface Props {
  label?: string;
}

export const TextCell: React.FC<Props> = React.memo(function ({ label }) {
  return (
    <Indent>
      <StandardText>{label}</StandardText>
    </Indent>
  );
});
