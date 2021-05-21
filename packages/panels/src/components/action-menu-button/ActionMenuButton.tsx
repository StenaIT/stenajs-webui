import * as React from "react";
import { ReactNode, useRef } from "react";
import {
  FlatButton,
  PrimaryButton,
  PrimaryButtonProps,
  SecondaryButton,
} from "@stenajs-webui/elements";
import { Box, useBoolean } from "@stenajs-webui/core";
import { Popover, PopoverProps } from "@stenajs-webui/tooltip";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FocusScope } from "@react-aria/focus";
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
  portalTarget = "parent",
  zIndex,
  ...buttonProps
}) => {
  const [isOpen, , close, toggle] = useBoolean(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

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
          const firstItem = popper.querySelector(
            "button:not([disabled]), a[href]"
          );
          if (firstItem) {
            (firstItem as HTMLButtonElement).focus();
          }
        },
        onHide() {
          if (buttonRef.current && restoreFocus) {
            buttonRef.current.focus();
          }
        },
      };
    },
  };

  return (
    <Box>
      <Popover
        disablePadding
        visible={isOpen}
        onClickOutside={close}
        placement={placement}
        content={
          isOpen && (
            <FocusScope contain>
              <Box>{renderItems(close)}</Box>
            </FocusScope>
          )
        }
        arrow={false}
        variant={"outlined"}
        appendTo={portalTarget}
        zIndex={zIndex}
        plugins={[focusManager]}
        lazy
      >
        <Button
          rightIcon={rightIcon}
          {...buttonProps}
          ref={buttonRef}
          onClick={toggle}
        />
      </Popover>
    </Box>
  );
};
