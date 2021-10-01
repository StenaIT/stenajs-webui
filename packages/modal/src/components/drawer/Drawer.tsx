import * as React from "react";
import * as ReactModal from "react-modal";
import cx from "classnames";

import styles from "./Drawer.module.css";

export type SlideFrom = "left" | "right";

export interface DrawerProps extends ReactModal.Props {
  width?: string;
  background?: string;
  onRequestClose?: () => void;
  /**
   * Which direction the drawer will appear from.
   * @default left
   * @param {String('left'|'right')}
   */
  slideFrom?: SlideFrom;
}

export const Drawer: React.FC<DrawerProps> = ({
  width = "370px",
  background,
  children,
  slideFrom = "left",
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
      style={{ content: { width, background } }}
      {...reactModalProps}
    >
      {children}
    </ReactModal>
  );
};
