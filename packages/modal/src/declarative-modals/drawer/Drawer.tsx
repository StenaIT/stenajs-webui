import * as React from "react";
import ReactModal from "react-modal";
import cx from "classnames";
import styles from "./Drawer.module.css";
import { exhaustSwitchCase, FlattenUnion } from "@stenajs-webui/core";
import {
  SlideFrom,
  SlideFromLeftRight,
  SlideFromTopBottom,
} from "../../common-types";

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

  /**
   * When true, there will be a gap between the drawer and the viewport.
   */
  floating?: boolean;

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
  floating,
  ...reactModalProps
}) => {
  const { height, width } = reactModalProps as FlattenUnion<DrawerProps>;

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
        base: cx(
          styles.content,
          getClassNameForSlide(slideFrom),
          floating && styles.floating,
        ),
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
