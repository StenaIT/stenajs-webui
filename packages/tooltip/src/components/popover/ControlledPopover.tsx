import * as React from "react";
import { PropsWithChildren, ReactNode, useCallback, useRef } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import cx from "classnames";
import moduleStyles from "./Popover.module.css";
import { Placement } from "../../types/Placement";

export interface ControlledPopoverProps extends PropsWithChildren {
  open: boolean;
  renderTrigger: (props: Record<string, unknown>) => ReactNode;
  onRequestClose: () => void;
  placement?: Placement;
  hideArrow?: boolean;
  disablePadding?: boolean;
  restoreFocus?: boolean;
  returnFocus?: boolean;
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const ControlledPopover: React.FC<ControlledPopoverProps> = ({
  children,
  placement = "bottom",
  hideArrow,
  renderTrigger,
  disablePadding,
  open,
  onRequestClose,
  restoreFocus,
  returnFocus,
}) => {
  const arrowRef = useRef(null);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
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

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  return (
    <>
      {renderTrigger({ ref: refs.setReference, ...getReferenceProps() })}

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            restoreFocus={restoreFocus}
            returnFocus={returnFocus}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps}
            >
              <div
                style={transitionStyles}
                className={cx(
                  moduleStyles.floating,
                  disablePadding && moduleStyles.disablePadding
                )}
              >
                {children}
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
