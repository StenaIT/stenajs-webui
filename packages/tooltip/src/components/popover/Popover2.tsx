import * as React from "react";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { Placement } from "../tooltip/Tooltip";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import cx from "classnames";
import moduleStyles from "./Popover2.module.css";

export type PopoverVariant =
  | "standard"
  | "info"
  | "warning"
  | "error"
  | "outlined";

export type PopoverTheme = "light" | "dark";

export interface Popover2Props extends PropsWithChildren {
  visible?: boolean;
  onRequestClose?: () => void;
  placement?: Placement;
  arrow?: boolean;
  disablePadding?: boolean;
  lazy?: boolean;
  variant?: PopoverVariant;
  theme?: PopoverTheme;
  content: ReactNode;
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const Popover2: React.FC<Popover2Props> = ({
  children,
  variant,
  content,
  visible,
  arrow: arrowVisible = true,
}) => {
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps } = useInteractions([dismiss, role]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {isMounted && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles}>
            <div
              style={styles}
              className={cx(
                moduleStyles.floating,
                variant && moduleStyles.withIcon
              )}
            >
              {content}
              {arrowVisible && (
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
      )}
    </>
  );
};
