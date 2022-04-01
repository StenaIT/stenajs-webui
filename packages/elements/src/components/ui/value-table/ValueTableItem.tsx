import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { BoxProps, Row, Text, TextProps } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import cx from "classnames";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { Icon } from "../icon/Icon";
import styles from "./ValueTable.module.css";
import { Property } from "csstype";

export interface ValueTableItemProps {
  label: string;
  labelIndent?: boolean | number;
  value: string | number | boolean | ReactNode | undefined;
  justifyContentLabel?: BoxProps["justifyContent"];
  justifyContentValue?: BoxProps["justifyContent"];
  labelWidth?: Property.Width;
  valueWidth?: Property.Width;
  alignLabel?: "flex-start" | "center" | "flex-end";
  alignValue?: "flex-start" | "center" | "flex-end";
  whiteSpaceLabel?: TextProps["whiteSpace"];
  whiteSpaceValue?: TextProps["whiteSpace"];
  wordBreakLabel?: TextProps["wordBreak"];
  wordBreakValue?: TextProps["wordBreak"];
  spacing?: number;
}

export const ValueTableItem: React.FC<ValueTableItemProps> = ({
  label,
  labelIndent,
  value,
  justifyContentLabel,
  justifyContentValue,
  labelWidth,
  valueWidth,
  alignLabel = "center",
  alignValue = "center",
  whiteSpaceLabel = "nowrap",
  whiteSpaceValue,
  wordBreakLabel,
  wordBreakValue,
  spacing = 1,
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
      <td
        className={cx({
          [styles.alignTdTop]: alignLabel === "flex-start",
          [styles.alignTdBottom]: alignLabel === "flex-end",
        })}
        width={labelWidth}
      >
        <Row
          minHeight={"var(--swui-value-table-height)"}
          alignItems={alignLabel}
          justifyContent={justifyContentLabel}
          indent={labelIndent}
          spacing={spacing}
        >
          <Text
            color={cssColor("--lhds-color-ui-600")}
            variant={"bold"}
            whiteSpace={whiteSpaceLabel}
            wordBreak={wordBreakLabel}
          >
            {label}
          </Text>
        </Row>
      </td>
      <td
        className={cx({
          [styles.alignTdTop]: alignValue === "flex-start",
          [styles.alignTdBottom]: alignValue === "flex-end",
        })}
        width={valueWidth}
      >
        <Row
          minHeight={"var(--swui-value-table-height)"}
          alignItems={alignValue}
          justifyContent={justifyContentValue}
          spacing={spacing}
        >
          {typeof formattedValue === "string" ? (
            <Text whiteSpace={whiteSpaceValue} wordBreak={wordBreakValue}>
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
