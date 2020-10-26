import * as React from "react";
import { ReactNode } from "react";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export interface ActionButtonProps extends FlatButtonProps {
  renderItems: (close: () => void) => ReactNode;
  placement?: PopoverProps["placement"];
}

export const ActionMenuButton: React.FC<ActionButtonProps> = ({
  renderItems,
  placement = "bottom",
  leftIcon = faEllipsisV,
  ...flatButtonProps
}) => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <Popover
      disablePadding
      visible={isOpen}
      onClickOutside={close}
      placement={placement}
      content={renderItems(close)}
    >
      <FlatButton leftIcon={leftIcon} {...flatButtonProps} onClick={open} />
    </Popover>
  );
};
