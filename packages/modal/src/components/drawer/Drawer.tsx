import * as React from "react";
import ReactModal from "react-modal";
import cx from "classnames";

import styles from "./Drawer.module.css";

export type SlideFrom = "left" | "right";

export interface DrawerProps
  extends Omit<
    ReactModal.Props,
    | "closeTimeoutMS"
    | "portalClassName"
    | "overlayClassName"
    | "className"
    | "style"
    | "parentSelector"
  > {
  width?: string;
  background?: string;
  zIndex?: number;
  onRequestClose?: () => void;
  /**
   * Which direction the drawer will appear from.
   * @default left
   * @param {String('left'|'right')}
   */
  slideFrom?: SlideFrom;
  /**
   * Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;
}

export const Drawer: React.FC<DrawerProps> = ({
  width = "370px",
  background,
  zIndex,
  children,
  slideFrom = "left",
  portalTarget,
  ...reactModalProps
}) => {
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
          slideFrom === "left" ? styles.slideFromLeft : styles.slideFromRight
        ),
        afterOpen: styles.afterOpen,
        beforeClose: styles.beforeClose,
      }}
      style={{ content: { width, background }, overlay: { zIndex } }}
      parentSelector={portalTarget ? () => portalTarget : undefined}
      {...reactModalProps}
    >
      {children}
    </ReactModal>
  );
};
