import styled from "@emotion/styled";
import {
  Box,
  Clickable,
  ThemeColorField,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import * as PopperJS from "popper.js";
import * as React from "react";
import { ReactNode, useMemo, useRef, useState } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { Arrow } from "./Arrow";

export type PopoverTriggerType = "hover" | "click";

type PopoverContentFunc = (args: PopoverContentFuncArgs) => ReactNode;

interface PopoverContentFuncArgs {
  show: () => void;
  hide: () => void;
}

export interface PopoverProps {
  placement?: PopperJS.Placement;
  trigger?: PopoverTriggerType;
  content?: ReactNode | PopoverContentFunc;
  children?: ReactNode | PopoverContentFunc;
  background?: ThemeColorField | string;
  disableCloseOnClickOutside?: boolean;
  zIndex?: number;
  onShow?: () => void;
  onHide?: () => void;
}

const FunctionChildrenWrapper = styled("div")<{ trigger: PopoverTriggerType }>`
  ${({ trigger }) => (trigger === "click" ? "cursor: pointer;" : "")}
`;

export function Popover({
  placement,
  trigger = "hover",
  content,
  children,
  background = "white",
  zIndex,
  onShow,
  onHide,
  disableCloseOnClickOutside
}: PopoverProps) {
  const [showing, setShowing] = useState(false);
  const outerRef = useRef(null);
  useOnClickOutside(outerRef, () => {
    if (trigger === "click" && !disableCloseOnClickOutside) {
      hide();
    }
  });

  const show = () => {
    setShowing(true);
    if (onShow) {
      onShow();
    }
  };

  const hide = () => {
    setShowing(false);
    if (onHide) {
      onHide();
    }
  };

  const { colors } = useThemeFields(
    {
      colors: {
        background: background
      }
    },
    [background]
  );

  const triggerProps = useMemo(() => {
    if (trigger === "hover") {
      return {
        onMouseEnter: show,
        onMouseLeave: hide
      };
    }
    return {};
  }, [trigger, show, hide]);

  return (
    <Box display={"inline-block"} innerRef={outerRef} {...triggerProps}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div ref={ref}>
              {typeof children === "function" ? (
                <FunctionChildrenWrapper trigger={trigger}>
                  {children({ show, hide })}
                </FunctionChildrenWrapper>
              ) : trigger === "click" ? (
                <Clickable onClick={show}>{children}</Clickable>
              ) : (
                children
              )}
            </div>
          )}
        </Reference>
        {showing && (
          <Popper placement={placement}>
            {({ ref, style, placement, arrowProps }) => {
              return (
                <Box
                  zIndex={zIndex}
                  innerRef={ref}
                  style={{
                    ...style,
                    transition: "opacity 0.3s",
                    margin: "0.4rem"
                  }}
                  background={colors.background}
                  borderRadius={"4px"}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                  borderColor={colors.background}
                  shadow={"modal"}
                  spacing
                  indent
                >
                  {typeof content === "function"
                    ? content({ show, hide })
                    : content}
                  <Arrow
                    background={colors.background}
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                </Box>
              );
            }}
          </Popper>
        )}
      </Manager>
    </Box>
  );
}
