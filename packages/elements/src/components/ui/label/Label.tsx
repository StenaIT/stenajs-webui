import { BoxProps, Column, Row, Text, Space } from "@stenajs-webui/core";
import * as React from "react";

export interface LabelProps extends BoxProps {
  text: string;
  optional?: boolean;
  maxCharacters?: number;
}

export const Label: React.FC<LabelProps> = React.memo(
  ({ text, optional = false, children, maxCharacters, ...columnProps }) => {
    const extraInfoLabel = getExtraInfoLabel(optional, maxCharacters);

    return (
      <Column {...columnProps}>
        <Row alignItems={"center"}>
          <Text
            color={"var(--lhds-color-ui-500)"}
            variant={"bold"}
            size={"small"}
            whiteSpace={"nowrap"}
          >
            {text}
          </Text>
          {extraInfoLabel && (
            <>
              <Space num={1.5} />
              <Text
                color={"var(--lhds-color-ui-500)"}
                variant={"caption"}
                size={"small"}
              >
                {extraInfoLabel}
              </Text>
            </>
          )}
        </Row>
        <Space />
        {children}
      </Column>
    );
  }
);

const getExtraInfoLabel = (
  optional: boolean,
  maxCharacters: number | undefined
): string | undefined => {
  const list: Array<string> = [];
  if (optional) {
    list.push("optional");
  }
  if (maxCharacters) {
    list.push("max " + maxCharacters + " characters");
  }
  if (list.length) {
    return "(" + list.join(", ") + ")";
  }
  return undefined;
};
