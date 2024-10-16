import * as React from "react";
import { ReactNode, useCallback, useRef, useState } from "react";
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
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import cx from "classnames";
import moduleStyles from "./Popover.module.css";
import { Placement } from "../../types/Placement";
import { FloatingTreeFallback } from "./FloatingTreeFallback";

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
  onRequestClose?: () => void;
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
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const Popover: React.FC<PopoverProps> = (props) => {
  const parentId = useFloatingParentNodeId();

  console.log("parentId");
  console.log(parentId);

  if (parentId == null) {
    return (
      <FloatingTree>
        <InnerPopover {...props} />
      </FloatingTree>
    );
  }

  return <InnerPopover {...props} />;
};

const InnerPopover: React.FC<PopoverProps> = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const nodeId = useFloatingNodeId();

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: (open, event, reason) => {
      console.log("----onOpenChange");
      console.log({ open });
      console.log({ event });
      console.log({ reason });
      setIsOpen(open);
    },
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

  const tree = useFloatingTree();
  console.log(tree?.nodesRef);

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
    <FloatingTreeFallback>
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
      </FloatingNode>
    </FloatingTreeFallback>
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
