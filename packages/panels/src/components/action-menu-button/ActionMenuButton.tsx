import * as React from "react";
import { ReactNode } from "react";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export interface ActionButtonProps extends FlatButtonProps {
  renderActionItems: (close: () => void) => ReactNode;
  placement?: PopoverProps["placement"];
}

export const ActionMenuButton: React.FC<ActionButtonProps> = ({
  renderActionItems,
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
      content={renderActionItems(close)}
    >
      <FlatButton leftIcon={leftIcon} {...flatButtonProps} onClick={open} />
    </Popover>
  );
};
