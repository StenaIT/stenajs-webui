import {
  Box,
  Clickable,
  ThemeColorField,
  useBoolean,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import * as PopperJS from "popper.js";
import * as React from "react";
import { ReactNode, useMemo, useRef } from "react";
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
}

export function Popover({
  placement,
  trigger = "hover",
  content,
  children,
  background = "white",
  zIndex,
  disableCloseOnClickOutside
}: PopoverProps) {
  const [showing, show, hide] = useBoolean(false);
  const outerRef = useRef(null);
  useOnClickOutside(outerRef, () => {
    if (trigger === "click" && !disableCloseOnClickOutside) {
      hide();
    }
  });

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
