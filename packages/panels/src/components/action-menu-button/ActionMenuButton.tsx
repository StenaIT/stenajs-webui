import * as React from "react";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";

export type ActionButtonProps = FlatButtonProps &
  Pick<PopoverProps, "placement">;

export const ActionMenuButton: React.FC<ActionButtonProps> = ({
  children,
  placement,
  leftIcon = faEllipsisH,
  ...flatButtonProps
}) => {
  const [isOpen, open, close] = useBoolean(false);

  return (
    <Popover
      disablePadding
      placement={placement}
      visible={isOpen}
      content={children}
      onClickOutside={close}
    >
      <FlatButton leftIcon={leftIcon} {...flatButtonProps} onClick={open} />
    </Popover>
  );
};
