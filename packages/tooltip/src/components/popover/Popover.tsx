import * as React from "react";
import { ReactNode, useCallback, useRef, useState } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import cx from "classnames";
import moduleStyles from "./Popover.module.css";
import { Placement } from "../../types/Placement";

export type PopoverVariant =
  | "standard"
  | "info"
  | "warning"
  | "error"
  | "outlined";

export type PopoverTheme = "light" | "dark";
export type PopoverTrigger = "click" | "hover" | "focus";

export type PopoverChildren =
  | ReactNode
  | ((args: PopoverChildrenArgs) => ReactNode);

export interface PopoverChildrenArgs {
  onRequestClose: () => void;
}

type TriggerProp = PopoverTrigger | Array<PopoverTrigger>;

export interface PopoverProps {
  children?: PopoverChildren;
  placement?: Placement;
  trigger?: TriggerProp;
  hideArrow?: boolean;
  disablePadding?: boolean;
  variant?: PopoverVariant;
  theme?: PopoverTheme;
  renderTrigger: (props: Record<string, unknown>) => ReactNode;
  restoreFocus?: boolean;
  returnFocus?: boolean;
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>;
  appendTo?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  zIndex?: number;
  onOpened?: () => void;
  onClosed?: () => void;
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const Popover: React.FC<PopoverProps> = ({
  children,
  variant,
  trigger = "hover",
  placement = "bottom",
  hideArrow,
  renderTrigger,
  disablePadding,
  restoreFocus,
  returnFocus,
  initialFocus,
  appendTo,
  zIndex,
  onOpened,
  onClosed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      if (open) {
        onOpened?.();
      } else {
        onClosed?.();
      }
    },
    [onClosed, onOpened],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange,
    placement,
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
  });

  const onRequestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const onFocus = useFocus(context, { enabled: hasTrigger(trigger, "focus") });
  const onClick = useClick(context, { enabled: hasTrigger(trigger, "click") });
  const onHover = useHover(context, {
    enabled: hasTrigger(trigger, "hover"),
    handleClose: safePolygon(),
    restMs: 100,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    onFocus,
    onClick,
    onHover,
    dismiss,
    role,
  ]);

  return (
    <>
      {renderTrigger({ ref: refs.setReference, ...getReferenceProps() })}

      {isMounted && (
        <FloatingPortal root={appendTo}>
          <FloatingFocusManager
            context={context}
            modal={false}
            restoreFocus={restoreFocus}
            returnFocus={returnFocus}
            initialFocus={initialFocus}
          >
            <div
              ref={refs.setFloating}
              style={{ zIndex, ...floatingStyles }}
              {...getFloatingProps}
            >
              <div
                style={transitionStyles}
                className={cx(
                  moduleStyles.floating,
                  disablePadding && moduleStyles.disablePadding,
                  variant && moduleStyles.withIcon,
                )}
              >
                {typeof children === "function"
                  ? children({ onRequestClose })
                  : children}
                {!hideArrow && (
                  <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    width={ARROW_WIDTH}
                    height={ARROW_HEIGHT}
                    fill={"white"}
                  />
                )}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

const hasTrigger = (
  triggerProp: TriggerProp,
  triggerToCheck: PopoverTrigger,
): boolean => {
  if (typeof triggerProp === "string") {
    return triggerProp === triggerToCheck;
  }
  return triggerProp.includes(triggerToCheck);
};
