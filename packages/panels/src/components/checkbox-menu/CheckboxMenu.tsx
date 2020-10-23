import * as React from "react";
import { ReactNode } from "react";
import { Box, Column, Indent, Row, useBoolean } from "@stenajs-webui/core";
import { ActionMenu, FlatButton } from "@stenajs-webui/elements";
import { Popover } from "@stenajs-webui/tooltip";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";

interface Props extends CheckboxProps {
  renderMenu: (close: () => void) => ReactNode;
}

const border = `1px solid var(--lhds-color-ui-300)`;

export const CheckboxMenu: React.FC<Props> = ({
  renderMenu,
  ...checkboxProps
}) => {
  const [isOpen, open, close] = useBoolean(false);
  return (
    <Popover
      onClickOutside={close}
      arrow={false}
      visible={isOpen}
      disablePadding
      content={
        renderMenu ? (
          <Column>
            <ActionMenu>{renderMenu(close)}</ActionMenu>
          </Column>
        ) : undefined
      }
      placement={"bottom-start"}
    >
      <Box display={"inline-block"}>
        <Row
          spacing={0.5}
          indent
          alignItems={"center"}
          border={border}
          borderRadius={"4px"}
        >
          <Checkbox {...checkboxProps} />
          <Indent num={0.5} />
          <FlatButton size={"small"} onClick={open} leftIcon={faAngleDown} />
        </Row>
      </Box>
    </Popover>
  );
};
