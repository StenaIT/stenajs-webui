import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { tableBorder } from "../../../config/TableConfig";
import { GridCellRequiredProps } from "../../grid-cell/hooks/UseGridCell";
import styles from "./StandardTableCellUi.module.css";
import { ZIndexProperty } from "csstype";

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
  zIndex?: number;
  left?: string;
  shadow?: string;
  onKeyDown?: BoxProps["onKeyDown"];
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
    width,
    minWidth,
    sticky,
    left,
    zIndex,
    shadow,
    onKeyDown,
  }) {
    return (
      <Row
        flex={width ? undefined : flex}
        width={width}
        minWidth={minWidth ?? width}
        height={"100%"}
        background={background}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
        overflow={"hidden"}
        position={sticky ? "sticky" : undefined}
        left={sticky && left == null ? "0px" : left}
        shadow={shadow}
        zIndex={
          sticky
            ? zIndex ?? ("var(--swui-sticky-column-z-index)" as ZIndexProperty)
            : zIndex
        }
        onKeyDown={onKeyDown}
      >
        <Row
          className={styles.standardTableCell}
          width={"100%"}
          height={"100%"}
          justifyContent={justifyContent}
          alignItems={"center"}
          border={"1px solid transparent"}
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
