import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import { Popover, PopoverProps } from "../popover/Popover";

export interface ButtonWithPopoverProps extends FlatButtonProps {
  children?: PopoverProps["children"];
  visible?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export const ButtonWithPopover: React.FC<ButtonWithPopoverProps> = ({
  children,
  onShow,
  onHide,
  ...buttonProps
}) => {
  return (
    <Popover
      content={children}
      trigger={"click"}
      zIndex={1000}
      portalTarget={document.body}
      onShow={onShow}
      onHide={onHide}
    >
      {({ show }) => <FlatButton {...buttonProps} onClick={show} />}
    </Popover>
  );
};
