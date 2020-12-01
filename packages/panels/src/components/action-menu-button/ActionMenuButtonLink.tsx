import * as React from "react";
import { ReactNode } from "react";
import { FlatButtonLink, FlatButtonLinkProps } from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export interface ActionButtonLinkProps extends FlatButtonLinkProps {
  renderItems: (close: () => void) => ReactNode;
  placement?: PopoverProps["placement"];
}

export const ActionMenuButtonLink: React.FC<ActionButtonLinkProps> = ({
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
      <FlatButtonLink leftIcon={leftIcon} {...flatButtonProps} onClick={open} />
    </Popover>
  );
};
