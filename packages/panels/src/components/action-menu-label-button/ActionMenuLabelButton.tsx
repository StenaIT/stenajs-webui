import * as React from "react";
import { ReactNode } from "react";
import { PrimaryButtonProps, SecondaryButton } from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export interface ActionMenuLabelButtonProps extends PrimaryButtonProps {
  renderItems: (close: () => void) => ReactNode;
  placement?: PopoverProps["placement"];
}

export const ActionMenuLabelButton: React.FC<ActionMenuLabelButtonProps> = ({
  renderItems,
  placement = "bottom",
  rightIcon = faAngleDown,
  ...buttonProps
}) => {
  const [isOpen, , close, toggle] = useBoolean(false);

  return (
    <Popover
      disablePadding
      visible={isOpen}
      onClickOutside={close}
      placement={placement}
      content={renderItems(close)}
      arrow={false}
      variant={"outlined"}
    >
      <SecondaryButton
        rightIcon={rightIcon}
        {...buttonProps}
        onClick={toggle}
      />
    </Popover>
  );
};
