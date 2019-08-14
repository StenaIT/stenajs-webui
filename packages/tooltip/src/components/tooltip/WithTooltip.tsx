import styled from "@emotion/styled";
import {
  Box,
  Clickable,
  useBoolean,
  useOnClickOutside
} from "@stenajs-webui/core";
import * as PopperJS from "popper.js";
import * as React from "react";
import { ReactNode, useMemo, useRef } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { Arrow } from "./Arrow";

export type PopupTriggerType = "hover" | "click";

type TooltipContentFunc = (args: TooltipContentFuncArgs) => ReactNode;

interface TooltipContentFuncArgs {
  show: () => void;
  hide: () => void;
}

interface WithTooltipProps {
  placement?: PopperJS.Placement;
  trigger?: PopupTriggerType;
  content?: ReactNode | TooltipContentFunc;
  children?: ReactNode | TooltipContentFunc;
}

export const PopperBox = styled("div")`
  background-color: white;
  border-radius: 3px;
  border: 1px solid silver;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  margin: 0.4rem;
  padding: 0.4rem;
  transition: opacity 0.3s;
  z-index: 2147483647;
  ${(props: any) => props.popperStyle};
`;

export function WithTooltip({
  placement,
  trigger = "hover",
  content,
  children
}: WithTooltipProps) {
  const [showing, show, hide] = useBoolean(false);
  const outerRef = useRef(null);
  useOnClickOutside(outerRef, () => {
    if (trigger === "click") {
      hide();
    }
  });

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
                children({ show, hide })
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
                <PopperBox ref={ref} style={style}>
                  {typeof content === "function"
                    ? content({ show, hide })
                    : content}
                  <Arrow
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                </PopperBox>
              );
            }}
          </Popper>
        )}
      </Manager>
    </Box>
  );
}
