import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { CSSProperties, ReactNode } from "react";
import { tableBorder } from "../../../config/TableConfig";
import { GridCellRequiredProps } from "../../grid-cell/hooks/UseGridCell";
import styles from "./StandardTableCellUi.module.css";

interface Props {
  width?: string;
  minWidth?: string;
  flex?: number;
  justifyContent?: string;
  enableGridCell?: boolean;
  isEditing: boolean;
  gridCellRequiredProps?: GridCellRequiredProps;
  background?: string;
  borderLeft?: string | boolean;
  children: ReactNode;
  sticky?: boolean;
  zIndex?: number | string;
  left?: string;
  right?: string;
  shadow?: string;
  onKeyDown?: BoxProps["onKeyDown"];
}

export const StandardTableCellUi = React.memo<Props>(
  function StandardTableCellUi({
    enableGridCell,
    borderLeft,
    children,
    background,
    gridCellRequiredProps,
    isEditing,
    justifyContent,
    width,
    minWidth,
    sticky,
    left,
    right,
    zIndex,
    shadow,
    onKeyDown,
  }) {
    return (
      <td
        style={{
          width: width,
          minWidth: minWidth ?? width ?? "20px",
          background: background,
          borderLeft:
            borderLeft === true ? tableBorder : borderLeft || undefined,
          overflow: "hidden",
          height: "var(--current-row-height)",
          position: sticky ? "sticky" : undefined,
          left: sticky ? left : undefined,
          right: sticky ? right : undefined,
          boxShadow: shadow,
          zIndex: (sticky
            ? zIndex ?? "var(--swui-sticky-column-z-index)"
            : zIndex ?? 1) as CSSProperties["zIndex"],
        }}
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
      </td>
    );
  }
);
