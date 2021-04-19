import { Column, Heading, Row, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Children } from "react";
import styles from "./ValueTable.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export type ValueTableVariant =
  | "relaxed"
  | "standard"
  | "condensed"
  | "compact";

export interface ValueTableProps {
  header?: string;
  footer?: string;
  variant?: ValueTableVariant;
}

export const ValueTable: React.FC<ValueTableProps> = ({
  children,
  header,
  footer,
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
        className={cx(styles.valueTable, styles[variant])}
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
