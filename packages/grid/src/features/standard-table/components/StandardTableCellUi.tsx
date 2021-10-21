import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { GridCellRequiredProps } from "../../grid-cell/hooks/UseGridCell";
import styles from "./StandardTableCellUi.module.css";
import { FocusedElement } from "./FocusedElement";

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
    onKeyDown,
    width,
    minWidth,
  }) {
    return (
      <Row
        width={width}
        minWidth={minWidth}
        height={"inherit"}
        background={background}
        overflow={"hidden"}
        onKeyDown={onKeyDown}
      >
        <FocusedElement
          as={"label"}
          className={styles.standardTableCell}
          justifyContent={justifyContent}
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
          <Row
            width={"100%"}
            height={"100%"}
            justifyContent={justifyContent}
            alignItems={"center"}
          >
            {children}
          </Row>
        </FocusedElement>
      </Row>
    );
  }
);
