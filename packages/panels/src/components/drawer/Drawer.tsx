import styled from "@emotion/styled";
import * as React from "react";
import * as ReactDOM from "react-dom";

export type SlideFrom = "left" | "right";

export interface DrawerProps {
  /** Ref to use for drawer. */
  innerRef?: React.Ref<HTMLDivElement>;

  portalTarget?: HTMLElement | null;
  /* Whether the drawer is open or not. */
  isOpen: boolean;
  /**
   * Which direction the drawer will appear from.
   * @default left
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
  "isOpen" | "slideFrom" | "width" | "zIndex"
>;

export const DrawerWrapper = styled("div")<DrawerWrapperProps>`
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
  width: ${({ width }) => width};
  transition: 0.6s all;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "2px 2px 20px 0 rgba(0, 0, 0, 0.15)" : "none"};
  z-index: ${({ zIndex }) => zIndex};
  top: 0;
`;

export const Drawer: React.FC<DrawerProps> = ({
  children,
  innerRef,
  isOpen,
  portalTarget,
  slideFrom = "left",
  width = "400px",
  zIndex = 1000
}) => {
  if (portalTarget) {
    return ReactDOM.createPortal(
      <DrawerWrapper
        ref={innerRef}
        isOpen={isOpen}
        slideFrom={slideFrom}
        width={width}
        zIndex={zIndex}
      >
        {children}
      </DrawerWrapper>,
      portalTarget
    );
  }
  return (
    <DrawerWrapper
      ref={innerRef}
      isOpen={isOpen}
      slideFrom={slideFrom}
      width={width}
      zIndex={zIndex}
    >
      {children}
    </DrawerWrapper>
  );
};
