import { Row, ScreenReaderOnlyText, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label: string;
  /**
   * If set, this label is used by screen readers instead of label prop.
   * For example, label could be "male", while screenReaderLabel is "Gender male".
   * If not set, screen readers will use label prop.
   */
  screenReaderLabel?: string;
  textColor?: string;
  wrapperRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  children,
  label,
  inputRef,
  wrapperRef,
  textColor,
  screenReaderLabel,
  ...checkboxProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Row alignItems={"center"}>
          <Checkbox {...checkboxProps} ref={inputRef} />
          <Space />
          {screenReaderLabel ? (
            <ScreenReaderOnlyText>{screenReaderLabel}</ScreenReaderOnlyText>
          ) : null}
          <Text
            color={textColor}
            aria-hidden={Boolean(screenReaderLabel)}
            userSelect={"none"}
          >
            {label}
          </Text>
          {children}
        </Row>
      </label>
    </div>
  );
};
