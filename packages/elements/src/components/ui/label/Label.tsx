import { Box, BoxProps, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ComponentPropsWithoutRef } from "react";

export interface LabelProps extends BoxProps {
  text: string;
  optional?: boolean;
  maxCharacters?: number;
  textWidth?: BoxProps["width"];
  htmlFor?: ComponentPropsWithoutRef<"label">["htmlFor"];
}

export const Label: React.FC<LabelProps> = React.memo(
  ({
    text,
    optional = false,
    children,
    maxCharacters,
    row,
    textWidth,
    htmlFor,
    ...boxProps
  }) => {
    const extraInfoLabel = getExtraInfoLabel(optional, maxCharacters);

    const infoLabel = extraInfoLabel && (
      <Text
        color={cssColor("--lhds-color-ui-600")}
        variant={"caption"}
        size={"small"}
      >
        {extraInfoLabel}
      </Text>
    );

    return (
      <label htmlFor={htmlFor}>
        <Box {...boxProps} row={row}>
          <Row alignItems={"center"} width={textWidth}>
            <Text
              color={cssColor("--lhds-color-ui-600")}
              size={"small"}
              whiteSpace={"nowrap"}
            >
              {text}
            </Text>
            {!row && <Indent num={1.5}>{infoLabel}</Indent>}
          </Row>
          <Space />
          {children}
        </Box>
        {row && (
          <Row justifyContent={"flex-end"} indent={0.5} spacing={0.5}>
            {infoLabel}
          </Row>
        )}
      </label>
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
