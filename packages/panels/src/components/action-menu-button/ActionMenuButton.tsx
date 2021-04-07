import * as React from "react";
import { ReactNode } from "react";
import {
  FlatButton,
  PrimaryButton,
  PrimaryButtonProps,
  SecondaryButton,
} from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export interface ActionMenuButtonProps
  extends Omit<
    PrimaryButtonProps,
    "variant" | "loading" | "loadingLabel" | "success" | "successLabel"
  > {
  /** The content of the Action Menu. */
  renderItems: (close: () => void) => ReactNode;
  /** The placement of the Action Menu. */
  placement?: PopoverProps["placement"];
  buttonComponent:
    | typeof PrimaryButton
    | typeof SecondaryButton
    | typeof FlatButton;
}

export const ActionMenuButton: React.FC<ActionMenuButtonProps> = ({
  renderItems,
  placement = "bottom",
  buttonComponent: Button,
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
      <Button rightIcon={rightIcon} {...buttonProps} onClick={toggle} />
    </Popover>
  );
};
