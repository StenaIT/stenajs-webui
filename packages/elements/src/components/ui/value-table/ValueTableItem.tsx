import { BoxProps, Row, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { stenaCheck } from "../../../icons/generated/CommonIcons";
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
      <td>
        <Row
          height={"var(--swui-value-table-height)"}
          alignItems={"center"}
          indent={labelIndent}
        >
          <Text color={cssColor("--tjara")} whiteSpace={"nowrap"}>
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
