import * as React from "react";
import { ReactNode, useMemo } from "react";
import {
  ActionMenuContext,
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
  /**  Z-index of the Action Menu */
  zIndex?: number;
  /** Portal target, HTML element. If not set, portal is not used. */
  portalTarget?: PopoverProps["appendTo"];
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
  portalTarget,
  zIndex,
  ...buttonProps
}) => {
  const [isOpen, open, close, toggle] = useBoolean(false);

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  return (
    <Popover
      disablePadding
      visible={isOpen}
      onClickOutside={close}
      placement={placement}
      content={
        <ActionMenuContext.Provider value={contextValue}>
          {renderItems(close)}
        </ActionMenuContext.Provider>
      }
      arrow={false}
      variant={"outlined"}
      appendTo={portalTarget ?? "parent"}
      zIndex={zIndex}
    >
      <Button rightIcon={rightIcon} {...buttonProps} onClick={toggle} />
    </Popover>
  );
};
