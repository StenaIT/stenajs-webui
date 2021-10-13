import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { BoxProps, Row, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { Icon } from "../icon/Icon";

export interface ValueTableItemProps {
  label: string;
  labelIndent?: boolean | number;
  value: string | number | boolean | ReactNode | undefined;
  alignValue?: BoxProps["justifyContent"];
}

export const ValueTableItem: React.FC<ValueTableItemProps> = ({
  label,
  value,
  alignValue = "left",
  labelIndent,
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
      <td>
        <Row
          height={"var(--swui-value-table-height)"}
          alignItems={"center"}
          indent={labelIndent}
        >
          <Text
            color={cssColor("--lhds-color-ui-600")}
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
