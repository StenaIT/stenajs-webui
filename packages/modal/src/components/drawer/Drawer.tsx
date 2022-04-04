import * as React from "react";
import ReactModal from "react-modal";
import cx from "classnames";
import styles from "./Drawer.module.css";
import { exhaustSwitchCase } from "@stenajs-webui/core";

export type SlideFrom = SlideFromLeftRight | SlideFromTopBottom;
export type SlideFromLeftRight = "left" | "right";
export type SlideFromTopBottom = "top" | "bottom";

export type DrawerProps = DrawerBaseLeftRight | DrawerBaseTopBottom;

interface DrawerBaseLeftRight extends DrawerBaseProps {
  width?: string;
  /**
   * Which direction the drawer will appear from.
   * @default left
   * @param {String('left'|'right')}
   */
  slideFrom?: SlideFromLeftRight;
}

interface DrawerBaseTopBottom extends DrawerBaseProps {
  height?: string;
  /**
   * Which direction the drawer will appear from.
   * @default left
   * @param {String('top'|'bottom')}
   */
  slideFrom?: SlideFromTopBottom;
}

interface DrawerBaseProps
  extends Omit<
    ReactModal.Props,
    | "closeTimeoutMS"
    | "portalClassName"
    | "overlayClassName"
    | "className"
    | "style"
    | "parentSelector"
  > {
  background?: string;
  zIndex?: number;
  onRequestClose?: () => void;
  /**
   * Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;
}

export const Drawer: React.FC<DrawerProps> = ({
  background,
  zIndex,
  children,
  slideFrom = "left",
  portalTarget,
  ...reactModalProps
}) => {
  const height =
    "height" in reactModalProps ? reactModalProps.height : undefined;
  const width = "width" in reactModalProps ? reactModalProps.width : undefined;

  return (
    <ReactModal
      closeTimeoutMS={250}
      portalClassName={styles.portal}
      overlayClassName={{
        base: styles.overlay,
        afterOpen: styles.afterOpen,
        beforeClose: styles.beforeClose,
      }}
      className={{
        base: cx(styles.content, getClassNameForSlide(slideFrom)),
        afterOpen: styles.afterOpen,
        beforeClose: styles.beforeClose,
      }}
      style={{ content: { width, height, background }, overlay: { zIndex } }}
      parentSelector={portalTarget ? () => portalTarget : undefined}
      {...reactModalProps}
    >
      {children}
    </ReactModal>
  );
};

const getClassNameForSlide = (slideFrom: SlideFrom): string => {
  switch (slideFrom) {
    case "left":
      return styles.slideFromLeft;
    case "right":
      return styles.slideFromRight;
    case "top":
      return styles.slideFromTop;
    case "bottom":
      return styles.slideFromBottom;
    default:
      return exhaustSwitchCase(slideFrom, styles.slideFromLeft);
  }
};
