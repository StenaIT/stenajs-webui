import { Column, Heading, Row, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Children } from "react";
import styles from "./ValueTable.module.css";

export interface ValueTableProps {
  header?: string;
  footer?: string;
}

export const ValueTable: React.FC<ValueTableProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <Column>
      {header && (
        <Row spacing>
          <Heading variant={"h5"}>{header}</Heading>
        </Row>
      )}
      <table cellPadding={0} cellSpacing={0} className={styles.valueTable}>
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
          <Text size={"small"} color={cssColor("--lhds-color-ui-500")}>
            {footer}
          </Text>
        </Row>
      )}
    </Column>
  );
};
