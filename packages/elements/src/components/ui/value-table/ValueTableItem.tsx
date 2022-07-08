import { BoxProps, Row, Text, TextProps } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { stenaCheck } from "../../../icons/ui/IconsUi";
import { Icon } from "../icon/Icon";

export interface ValueTableItemProps {
  label: string;
  labelIndent?: boolean | number;
  value: string | number | boolean | ReactNode | undefined;
  alignLabel?: BoxProps["justifyContent"];
  alignValue?: BoxProps["justifyContent"];
  labelWidth?: ComponentPropsWithoutRef<"td">["width"];
  valueWidth?: ComponentPropsWithoutRef<"td">["width"];
  labelWhiteSpace?: TextProps["whiteSpace"];
  disableValueWrapping?: boolean;
}

export const ValueTableItem: React.FC<ValueTableItemProps> = ({
  label,
  labelIndent,
  value,
  alignLabel = "left",
  alignValue = "left",
  labelWidth,
  valueWidth,
  labelWhiteSpace = "nowrap",
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
            icon={stenaCheck}
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
        <Row justifyContent={alignLabel} indent={labelIndent}>
          <Text
            color={cssColor("--lhds-color-ui-600")}
            variant={"bold"}
            whiteSpace={labelWhiteSpace}
          >
            {label}
          </Text>
        </Row>
      </td>
      <td width={valueWidth}>
        <Row justifyContent={alignValue}>
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
