import styled from "@emotion/styled";
import {
  Box,
  Clickable,
  ThemeColorField,
  useMultiOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import * as PopperJS from "popper.js";
import * as React from "react";
import {
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import * as ReactDOM from "react-dom";
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
  innerRef?: RefObject<HTMLDivElement>;
  disablePadding?: boolean;
  /**
   * Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;
  disableCloseOnClickOutside?: boolean;
  disableArrow?: boolean;
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
  innerRef,
  portalTarget,
  background = "white",
  zIndex,
  onShow,
  onHide,
  disableCloseOnClickOutside,
  disableArrow,
  disablePadding
}: PopoverProps) {
  const [showing, setShowing] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const refToUse = innerRef || outerRef;
  useMultiOnClickOutside([refToUse, portalRef], () => {
    if (trigger === "click" && !disableCloseOnClickOutside) {
      hide();
    }
  });

  const show = useCallback(() => {
    setShowing(true);
    if (onShow) {
      onShow();
    }
  }, [onShow]);

  const hide = useCallback(() => {
    setShowing(false);
    if (onHide) {
      onHide();
    }
  }, [onHide]);

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

  const popperContent = (
    <>
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
                spacing={disablePadding ? 0 : 1}
                indent={disablePadding ? 0 : 1}
              >
                {typeof content === "function"
                  ? content({ show, hide })
                  : content}
                {!disableArrow && (
                  <Arrow
                    background={colors.background}
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                )}
              </Box>
            );
          }}
        </Popper>
      )}
    </>
  );
  return (
    <Box display={"inline-block"} innerRef={refToUse} {...triggerProps}>
      <Manager>
        {
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
        }
        {portalTarget
          ? ReactDOM.createPortal(
              <Box innerRef={portalRef}>{popperContent}</Box>,
              portalTarget
            )
          : popperContent}
      </Manager>
    </Box>
  );
}
