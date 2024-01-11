import { Column, Heading, Row, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Children, ReactNode } from "react";
import styles from "./ValueTable.module.css";
import cx from "classnames";

export type ValueTableVariant =
  | "relaxed"
  | "standard"
  | "condensed"
  | "compact";

export interface ValueTableProps {
  header?: string;
  footer?: string;
  disableBorder?: boolean;
  variant?: ValueTableVariant;
  children?: ReactNode;
}

export const ValueTable: React.FC<ValueTableProps> = ({
  children,
  header,
  footer,
  disableBorder = false,
  variant = "standard",
}) => {
  return (
    <Column>
      {header && (
        <Row spacing>
          <Heading variant={"h5"}>{header}</Heading>
        </Row>
      )}
      <table
        cellPadding={0}
        cellSpacing={0}
        className={cx(
          styles.valueTable,
          !disableBorder && styles.withBorder,
          styles[variant]
        )}
      >
        <tbody>
          {Children.map(children, (child, index) => (
            <tr key={index} className={styles.row}>
              {child}
            </tr>
          ))}
        </tbody>
      </table>
      {footer && (
        <Row spacing>
          <Text size={"small"} color={cssColor("--lhds-color-ui-600")}>
            {footer}
          </Text>
        </Row>
      )}
    </Column>
  );
};
