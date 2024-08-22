import * as React from "react";
import { ReactNode } from "react";
import { Column, Indent, Row } from "@stenajs-webui/core";
import {
  ActionMenu,
  FlatButton,
  stenaAngleDown,
} from "@stenajs-webui/elements";
import { Popover } from "@stenajs-webui/tooltip";
import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";

export interface CheckboxMenuProps extends CheckboxProps {
  renderMenu: (close: () => void) => ReactNode;
}

const border = `1px solid var(--lhds-color-ui-300)`;

// TODO POPOVER placement={"bottom-start"}

export const CheckboxMenu: React.FC<CheckboxMenuProps> = ({
  renderMenu,
  ...checkboxProps
}) => {
  return (
    <Popover
      trigger={"click"}
      renderTrigger={(props) => (
        <Row>
          <Row
            spacing={0.5}
            indent
            alignItems={"center"}
            border={border}
            borderRadius={"4px"}
          >
            <Checkbox {...checkboxProps} />
            <Indent num={0.5} />
            <FlatButton size={"small"} leftIcon={stenaAngleDown} {...props} />
          </Row>
        </Row>
      )}
      hideArrow
      disablePadding
      placement={"bottom"}
    >
      {({ onRequestClose }) => (
        <Column>
          <ActionMenu>{renderMenu(onRequestClose)}</ActionMenu>
        </Column>
      )}
    </Popover>
  );
};
