import { Row, ScreenReaderOnlyText, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
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

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  inputRef,
  wrapperRef,
  textColor,
  screenReaderLabel,
  ...radioButtonProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Row alignItems={"center"}>
          <RadioButton ref={inputRef} {...radioButtonProps} />
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
        </Row>
      </label>
    </div>
  );
};
