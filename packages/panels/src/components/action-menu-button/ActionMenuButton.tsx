import * as React from "react";
import { ReactNode, RefObject, useMemo, useRef } from "react";
import {
  ActionMenu,
  ActionMenuContext,
  ActionMenuProps,
  FlatButton,
  PrimaryButton,
  PrimaryButtonProps,
  SecondaryButton,
  stenaAngleDown,
} from "@stenajs-webui/elements";
import { useBoolean } from "@stenajs-webui/core";
import {
  ControlledPopover,
  ControlledPopoverProps,
  PopoverProps,
} from "@stenajs-webui/tooltip";

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
  appendTo?: ControlledPopoverProps["appendTo"];
  menuWidth?: ActionMenuProps["width"];
  menuTop?: ActionMenuProps["top"];
  buttonComponent:
    | typeof PrimaryButton
    | typeof SecondaryButton
    | typeof FlatButton;
  disableArrow?: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
}

export const ActionMenuButton: React.FC<ActionMenuButtonProps> = ({
  renderItems,
  placement = "bottom",
  buttonComponent: Button,
  rightIcon = stenaAngleDown,
  menuWidth,
  menuTop,
  onClick,
  disableArrow = false,
  buttonRef,
  appendTo,
  zIndex,
  ...buttonProps
}) => {
  const [isOpen, open, close, toggle] = useBoolean(false);

  const fallbackRef = useRef<HTMLButtonElement>(null);
  const ref = buttonRef ?? fallbackRef;

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(event);
    toggle();
  };

  return (
    <>
      <ControlledPopover
        renderTrigger={(props) => (
          <Button
            rightIcon={disableArrow ? undefined : rightIcon}
            {...buttonProps}
            ref={ref}
            onClick={handleClick}
            {...props}
          />
        )}
        hideArrow
        disablePadding
        open={isOpen}
        onRequestClose={close}
        placement={placement}
        appendTo={appendTo}
        zIndex={zIndex}
      >
        {isOpen && (
          <ActionMenu width={menuWidth} top={menuTop} trapFocus>
            <ActionMenuContext.Provider value={contextValue}>
              {renderItems(close)}
            </ActionMenuContext.Provider>
          </ActionMenu>
        )}
      </ControlledPopover>
    </>
  );
};
