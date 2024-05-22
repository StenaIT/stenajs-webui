import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, ScreenReaderOnlyText, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./RadioButtonBox.module.css";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export type RadioButtonBoxVariant = "normal" | "danger";

export type RadioButtonBoxProps =
  | RadioButtonBoxNoRightProps
  | RadioButtonBoxIconProps
  | RadioButtonBoxContentRightProps;

export interface RadioButtonBoxCommonProps extends RadioButtonProps {
  label?: string;
  /**
   * If set, this label is used by screen readers instead of label prop.
   * For example, label could be "male", while screenReaderLabel is "Gender male".
   * If not set, screen readers will use label prop.
   */
  screenReaderLabel?: string;
  variant?: RadioButtonBoxVariant;
  radioButtonClassName?: string;
}

export interface RadioButtonBoxNoRightProps extends RadioButtonBoxCommonProps {
  icon?: never;
  contentRight?: never;
}

export interface RadioButtonBoxIconProps extends RadioButtonBoxCommonProps {
  icon: IconDefinition;
  contentRight?: never;
}

export interface RadioButtonBoxContentRightProps
  extends RadioButtonBoxCommonProps {
  icon?: never;
  contentRight: ReactNode;
}

export const RadioButtonBox: React.FC<RadioButtonBoxProps> = ({
  label,
  screenReaderLabel,
  variant = "normal",
  className,
  icon,
  contentRight,
  style,
  radioButtonClassName,
  ...radioButtonProps
}) => {
  return (
    <label
      className={cx(styles.radioButtonBox, styles[variant], className)}
      style={style}
    >
      <Row justifyContent={"space-between"} flexGrow={1}>
        <Row alignItems={"center"}>
          <RadioButton {...radioButtonProps} className={radioButtonClassName} />
          <Space />
          {screenReaderLabel ? (
            <ScreenReaderOnlyText>{screenReaderLabel}</ScreenReaderOnlyText>
          ) : null}
          <Text aria-hidden={Boolean(screenReaderLabel)}>{label}</Text>
          {icon && (
            <Row alignItems={"center"} width={"48px"} justifyContent={"center"}>
              <Icon icon={icon} size={24} />
            </Row>
          )}
          {contentRight && (
            <Row alignItems={"center"} justifyContent={"center"}>
              {contentRight}
            </Row>
          )}
        </Row>
      </Row>
    </label>
  );
};
