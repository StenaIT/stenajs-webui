import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { BoxProps, Row, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode, useMemo } from "react";

export interface ValueTableItemProps {
  label: string;
  value: string | number | boolean | ReactNode | undefined;
  alignValue?: BoxProps["justifyContent"];
}

export const ValueTableItem: React.FC<ValueTableItemProps> = ({
  label,
  value,
  alignValue = "left",
}) => {
  const formattedValue = useMemo(() => {
    if (value == null) {
      return "-";
    }

    if (typeof value === "boolean") {
      if (value) {
        return (
          <Icon icon={faCheck} size={14} color={"var(--lhds-color-ui-700)"} />
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
      <td>
        <Row height={"var(--swui-value-table-height)"} alignItems={"center"}>
          <Text
            color={cssColor("--lhds-color-ui-500")}
            variant={"bold"}
            whiteSpace={"nowrap"}
          >
            {label}
          </Text>
        </Row>
      </td>
      <td>
        <Row
          height={"var(--swui-value-table-height)"}
          alignItems={"center"}
          justifyContent={alignValue}
        >
          {typeof formattedValue === "string" ? (
            <Text>{formattedValue}</Text>
          ) : (
            formattedValue
          )}
        </Row>
      </td>
    </>
  );
};
