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
  enableGridCellFocus?: boolean;
  isEditing: boolean;
  gridCellRequiredProps?: GridCellRequiredProps;
  background?: string;
  children: ReactNode;
  onKeyDown?: BoxProps["onKeyDown"];
}

export const StandardTableCellUi = React.memo<Props>(
  function StandardTableCellUi({
    enableGridCell,
    enableGridCellFocus,
    children,
    background,
    gridCellRequiredProps,
    isEditing,
    justifyContent,
    onKeyDown,
    width,
    minWidth,
  }) {
    const addFocusBorder = enableGridCell && !isEditing && enableGridCellFocus;

    const addFocusWithinBorder =
      enableGridCell && !isEditing && !enableGridCellFocus;

    const focusBorder = "1px solid var(--swui-primary-action-color)";

    return (
      <Row
        width={width}
        minWidth={minWidth}
        height={"inherit"}
        background={background}
        overflow={"hidden"}
        onKeyDown={onKeyDown}
      >
        <Row
          border={"1px solid transparent"}
          className={styles.standardTableCell}
          width={"100%"}
          height={"100%"}
          justifyContent={justifyContent}
          alignItems={"center"}
          borderRadius={enableGridCell ? "4px" : undefined}
          focusBorder={addFocusBorder ? focusBorder : undefined}
          focusWithinBorder={addFocusWithinBorder ? focusBorder : undefined}
          hoverBorder={
            enableGridCell && !isEditing && enableGridCellFocus
              ? "1px solid var(--lhds-color-ui-300)"
              : undefined
          }
          {...(enableGridCell && enableGridCellFocus
            ? gridCellRequiredProps
            : undefined)}
        >
          {children}
        </Row>
      </Row>
    );
  }
);
