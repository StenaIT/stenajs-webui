import * as React from "react";
import { PropsWithChildren, ReactNode, useCallback, useRef } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
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
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>;
  appendTo?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  zIndex?: number;
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const ControlledPopover: React.FC<ControlledPopoverProps> = ({
  children,
  ...props
}) => {
  const parentNodeId = useFloatingParentNodeId();

  if (parentNodeId == null) {
    return (
      <FloatingTree>
        <ControlledPopoverComponent {...props}>
          {children}
        </ControlledPopoverComponent>
      </FloatingTree>
    );
  }

  return (
    <ControlledPopoverComponent {...props}>
      {children}
    </ControlledPopoverComponent>
  );
};

const ControlledPopoverComponent: React.FC<ControlledPopoverProps> = ({
  children,
  placement = "bottom",
  hideArrow,
  renderTrigger,
  disablePadding,
  open,
  onRequestClose,
  restoreFocus,
  returnFocus,
  initialFocus,
  appendTo,
  zIndex,
}) => {
  const nodeId = useFloatingNodeId();

  const arrowRef = useRef(null);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onRequestClose();
      }
    },
    [onRequestClose],
  );

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
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

      <FloatingNode id={nodeId}>
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
                {...getFloatingProps()}
              >
                <div
                  style={transitionStyles}
                  className={cx(
                    moduleStyles.floating,
                    disablePadding && moduleStyles.disablePadding,
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
      </FloatingNode>
    </>
  );
};
