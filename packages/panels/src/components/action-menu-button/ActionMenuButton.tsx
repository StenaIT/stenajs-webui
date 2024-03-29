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
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { Plugin as TippyPlugin, Props as TippyProps } from "tippy.js";

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
  portalTarget = "parent",
  zIndex,
  menuWidth,
  menuTop,
  onClick,
  disableArrow = false,
  buttonRef,
  ...buttonProps
}) => {
  const [isOpen, open, close, toggle] = useBoolean(false);

  const fallbackRef = useRef<HTMLButtonElement>(null);
  const ref = buttonRef ?? fallbackRef;

  const focusManager: TippyPlugin<TippyProps> = {
    name: "focusManager",
    defaultValue: true,
    fn({ popper }) {
      let restoreFocus = false;

      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          restoreFocus = true;
          close();
        }
        if (event.key === "Enter" || event.key === " ") {
          restoreFocus = true;
        }
      };

      return {
        onCreate() {
          popper.addEventListener("keydown", closeOnEscape);
        },
        onDestroy() {
          popper.removeEventListener("keydown", closeOnEscape);
        },
        onMount() {
          restoreFocus = false;
          popper
            .querySelector<HTMLElement>("button:not([disabled]), a[href]")
            ?.focus();
        },
        onHide() {
          if (ref.current && restoreFocus) {
            ref.current.focus();
          }
        },
      };
    },
  };

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(event);
    toggle();
  };

  return (
    <>
      <Button
        rightIcon={disableArrow ? undefined : rightIcon}
        {...buttonProps}
        ref={ref}
        onClick={handleClick}
      />
      <Popover
        disablePadding
        visible={isOpen}
        onClickOutside={close}
        placement={placement}
        content={
          isOpen && (
            <ActionMenu width={menuWidth} top={menuTop} trapFocus>
              <ActionMenuContext.Provider value={contextValue}>
                {renderItems(close)}
              </ActionMenuContext.Provider>
            </ActionMenu>
          )
        }
        arrow={false}
        appendTo={portalTarget}
        zIndex={zIndex}
        plugins={[focusManager]}
        lazy
        reference={ref}
      />
    </>
  );
};
