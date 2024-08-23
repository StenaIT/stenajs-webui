import { Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { CSSProperties, PropsWithChildren, useRef, useState } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import moduleStyles from "./Tooltip.module.css";
import { cssColor } from "@stenajs-webui/theme";
import cx from "classnames";
import {
  Icon,
  stenaExclamationCircle,
  stenaExclamationTriangle,
  stenaInfoCircle,
} from "@stenajs-webui/elements";
import { Placement } from "../../types/Placement";

export interface TooltipProps extends PropsWithChildren {
  placement?: Placement;
  visible?: boolean;
  label: string;
  variant?: TooltipVariant;
  maxWidth?: CSSProperties["maxWidth"];
}

type TooltipVariant = "info" | "warning" | "error";

const variantIcons = {
  info: stenaInfoCircle,
  warning: stenaExclamationCircle,
  error: stenaExclamationTriangle,
};

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 8;
const GAP = 2;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  visible,
  placement,
  label,
  variant,
  maxWidth = "500px",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: placement,
    open: visible ?? isOpen,
    onOpenChange: setIsOpen,
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

  const hover = useHover(context);

  const { getReferenceProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {isMounted && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles}>
            <div
              style={{ maxWidth, ...styles }}
              className={cx(
                moduleStyles.floating,
                variant && moduleStyles.withIcon
              )}
            >
              {variant ? (
                <>
                  <div
                    className={cx(
                      moduleStyles.iconWrapper,
                      moduleStyles[variant]
                    )}
                  >
                    <Icon icon={variantIcons[variant]} size={16} />
                  </div>
                  <Space />
                  <TooltipText label={label} />
                </>
              ) : (
                <TooltipText label={label} />
              )}

              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                fill={"#333"}
              />
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

const TooltipText: React.FC<{ label: string }> = ({ label }) => (
  <Text
    color={cssColor("--lhds-color-ui-50")}
    size={"small"}
    variant={"bold"}
    whiteSpace={"nowrap"}
  >
    {label}
  </Text>
);
