import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { GridCellRequiredProps } from "../../grid-cell/hooks/UseGridCell";
import styles from "./StandardTableCellUi.module.css";

interface Props {
  width?: string;
  minWidth?: string;
  justifyContent?: string;
  enableGridCell?: boolean;
  isEditing: boolean;
  gridCellRequiredProps?: GridCellRequiredProps;
  background?: string;
  children: ReactNode;
  onKeyDown?: BoxProps["onKeyDown"];
}

export const StandardTableCellUi = React.memo<Props>(
  function StandardTableCellUi({
    enableGridCell,
    children,
    background,
    gridCellRequiredProps,
    isEditing,
    justifyContent,
    width,
    minWidth,
    onKeyDown,
  }) {
    return (
      <Row
        width={width}
        minWidth={minWidth ?? width ?? "20px"}
        height={"100%"}
        background={background}
        overflow={"hidden"}
        onKeyDown={onKeyDown}
      >
        <Row
          border={"1px solid transparent"}
          className={styles.standardTableCell}
          width={width}
          minWidth={minWidth ?? width ?? "20px"}
          height={"100%"}
          justifyContent={justifyContent}
          alignItems={"center"}
          borderRadius={enableGridCell ? "4px" : undefined}
          focusBorder={
            enableGridCell && !isEditing
              ? "1px solid var(--swui-primary-action-color)"
              : undefined
          }
          hoverBorder={
            enableGridCell && !isEditing
              ? "1px solid var(--lhds-color-ui-300)"
              : undefined
          }
          {...(enableGridCell ? gridCellRequiredProps : undefined)}
        >
          {children}
        </Row>
      </Row>
    );
  }
);
