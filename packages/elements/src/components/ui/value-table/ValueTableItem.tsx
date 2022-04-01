import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { BoxProps, Row, Text, TextProps } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { Property } from "csstype";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { Icon } from "../icon/Icon";

export interface ValueTableItemProps {
  label: string;
  labelIndent?: boolean | number;
  value: string | number | boolean | ReactNode | undefined;
  justifyContentLabel?: BoxProps["justifyContent"];
  justifyContentValue?: BoxProps["justifyContent"];
  labelWidth?: Property.Width;
  valueWidth?: Property.Width;
  whiteSpaceLabel?: TextProps["whiteSpace"];
  disableValueWrapping?: boolean;
}

export const ValueTableItem: React.FC<ValueTableItemProps> = ({
  label,
  labelIndent,
  value,
  justifyContentLabel,
  justifyContentValue,
  labelWidth,
  valueWidth,
  whiteSpaceLabel = "nowrap",
  disableValueWrapping = false,
}) => {
  const formattedValue = useMemo(() => {
    if (value == null) {
      return "-";
    }

    if (typeof value === "boolean") {
      if (value) {
        return (
          <Icon
            icon={faCheck}
            size={14}
            color={cssColor("--lhds-color-ui-700")}
          />
        );
      } else {
        return "-";
      }
    }
    if (typeof value === "number") {
      return String(value);
    }

    return value;
  }, [value]);

  return (
    <>
      <td width={labelWidth}>
        <Row justifyContent={justifyContentLabel} indent={labelIndent}>
          <Text
            color={cssColor("--lhds-color-ui-600")}
            variant={"bold"}
            whiteSpace={whiteSpaceLabel}
          >
            {label}
          </Text>
        </Row>
      </td>
      <td width={valueWidth}>
        <Row justifyContent={justifyContentValue}>
          {typeof formattedValue === "string" ? (
            <Text
              whiteSpace={disableValueWrapping ? "nowrap" : "pre-line"}
              wordBreak={disableValueWrapping ? undefined : "normal"}
            >
              {formattedValue}
            </Text>
          ) : (
            formattedValue
          )}
        </Row>
      </td>
    </>
  );
};
