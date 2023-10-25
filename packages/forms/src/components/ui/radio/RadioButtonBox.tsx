import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, ScreenReaderOnlyText, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import styles from "./RadioButtonBox.module.css";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export type RadioButtonBoxVariant = "normal" | "danger";

export interface RadioButtonBoxProps extends RadioButtonProps {
  label?: string;
  screenReaderOnlyLabelPrefix?: string;
  variant?: RadioButtonBoxVariant;
  icon?: IconDefinition;
}

export const RadioButtonBox: React.FC<RadioButtonBoxProps> = ({
  label,
  screenReaderOnlyLabelPrefix,
  variant = "normal",
  icon,
  className,
  style,
  ...radioButtonProps
}) => {
  return (
    <label
      className={cx(styles.radioButtonBox, styles[variant], className)}
      style={style}
    >
      <Row justifyContent={"space-between"} flexGrow={1}>
        <Row alignItems={"center"}>
          <RadioButton {...radioButtonProps} />
          <Space />
          {screenReaderOnlyLabelPrefix ? (
            <ScreenReaderOnlyText>
              {screenReaderOnlyLabelPrefix}{" "}
            </ScreenReaderOnlyText>
          ) : null}
          <Text>{label}</Text>
        </Row>
        <Row alignItems={"center"} width={"48px"} justifyContent={"center"}>
          {icon && <Icon icon={icon} size={24} />}
        </Row>
      </Row>
    </label>
  );
};
