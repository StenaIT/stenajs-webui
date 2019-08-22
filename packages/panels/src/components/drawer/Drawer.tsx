import styled from "@emotion/styled";
import * as React from "react";
import * as ReactDOM from "react-dom";

type SlideFrom = "left" | "right";

export interface DrawerProps {
  drawerRef?: React.Ref<HTMLDivElement>;
  /* Whether the drawer should use a portal, and where it should attach */
  portalTarget?: HTMLElement | null;
  isOpen: boolean;
  slideFrom?: SlideFrom;
  width?: string;
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
  drawerRef,
  isOpen,
  portalTarget,
  slideFrom = "left",
  width = "400px",
  zIndex = 1000
}) => {
  if (portalTarget) {
    console.log("her");
    return ReactDOM.createPortal(
      <DrawerWrapper
        ref={drawerRef}
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
      ref={drawerRef}
      isOpen={isOpen}
      slideFrom={slideFrom}
      width={width}
      zIndex={zIndex}
    >
      {children}
    </DrawerWrapper>
  );
};
