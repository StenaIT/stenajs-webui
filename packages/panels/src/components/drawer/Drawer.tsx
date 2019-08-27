import styled from "@emotion/styled";
import { DivProps, ThemeColorField, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";

export type SlideFrom = "left" | "right";

export interface DrawerProps extends DivProps {
  /**
   * Background of the drawer
   */
  background?: ThemeColorField | string;

  /**
   * Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;

  /**
   * Whether the drawer is open or not.
   */
  isOpen: boolean;
  /**
   * Which direction the drawer will appear from.
   * @default left
   * @param {String('left'|'right')}
   */
  slideFrom?: SlideFrom;
  /**
   * The width of the drawer.
   * @default 400px
   */
  width?: string;
  /**
   * The zIndex for the drawer.
   * @default 1000
   */
  zIndex?: number;
}

type DrawerWrapperProps = Pick<
  DrawerProps,
  "isOpen" | "slideFrom" | "width" | "zIndex" | "background"
>;

const DrawerWrapper = styled("div")<DrawerWrapperProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  transform: translateX(
    ${({ isOpen, slideFrom, width }) =>
      isOpen ? 0 : slideFrom === "right" ? `${width}` : `-${width}`}
  );
  right: ${props => (props.slideFrom === "right" ? 0 : "auto")};
  left: ${props => (props.slideFrom === "left" ? 0 : "auto")};
  height: 100%;
  ${({ width }) => `width: ${width};`}
  ${({ background }) =>
    `background: ${background};`}
  transition: 0.2s transform;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "2px 2px 20px 0 rgba(0, 0, 0, 0.15)" : "none"};
  z-index: ${({ zIndex }) => zIndex};
  top: 0;
`;

export const Drawer: React.FC<DrawerProps> = ({
  children,
  innerRef,
  isOpen,
  background,
  portalTarget,
  slideFrom = "left",
  width = "400px",
  zIndex = 1000,
  ...divProps
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        background
      }
    },
    [background]
  );

  const drawer = (
    <DrawerWrapper
      ref={innerRef}
      isOpen={isOpen}
      slideFrom={slideFrom}
      width={width}
      zIndex={zIndex}
      background={colors.background}
      {...divProps}
    >
      {children}
    </DrawerWrapper>
  );
  if (portalTarget) {
    return ReactDOM.createPortal(drawer, portalTarget);
  }
  return drawer;
};
