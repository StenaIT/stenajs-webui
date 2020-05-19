import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { tableBorder } from "../../../config/TableConfig";
import { GridCellRequiredProps } from "../../../hooks/UseGridCell";

interface Props {
  width?: string;
  flex?: number;
  justifyContent?: string;
  enableGridCell?: boolean;
  isEditing: boolean;
  gridCellRequiredProps: GridCellRequiredProps;
  background?: string;
  borderLeft?: string | boolean;
  children: ReactNode;
}

export const StandardTableCellUi = React.memo<Props>(
  function StandardTableCellUi({
    enableGridCell,
    borderLeft,
    children,
    background,
    flex,
    gridCellRequiredProps,
    isEditing,
    justifyContent,
    width
  }) {
    return (
      <Row
        flex={width ? undefined : flex}
        width={width}
        minWidth={width}
        height={"100%"}
        background={background}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
      >
        <Row
          width={"100%"}
          height={"100%"}
          justifyContent={justifyContent}
          alignItems={"center"}
          border={"1px solid transparent"}
          borderRadius={enableGridCell ? "4px" : undefined}
          focusBorder={
            enableGridCell && !isEditing
              ? "1px solid var(--primary-action-color)"
              : undefined
          }
          hoverBorder={
            enableGridCell && !isEditing ? "var(--ui5) solid 1px;" : undefined
          }
          {...(enableGridCell ? gridCellRequiredProps : undefined)}
        >
          {children}
        </Row>
      </Row>
    );
  }
);
