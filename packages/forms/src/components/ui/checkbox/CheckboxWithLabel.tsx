import { Row, Space, StandardText, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: string;
  textColor?: ThemeColorField | string;
  innerRef?: Ref<HTMLDivElement>;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = props => {
  const {
    children,
    disabled,
    label,
    innerRef,
    textColor,
    ...propsToCheckbox
  } = props;

  return (
    <div ref={innerRef}>
      <label>
        <Row alignItems={"center"}>
          <Checkbox {...propsToCheckbox} disabled={disabled} />
          <Space />
          {label && (
            <StandardText
              color={disabled ? "--swui-checkbox-disabled" : undefined}
            >
              {label}
            </StandardText>
          )}
          {children}
        </Row>
      </label>
    </div>
  );
};
