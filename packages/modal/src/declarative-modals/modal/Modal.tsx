import * as React from "react";
import ReactModal from "react-modal";

import styles from "./Modal.module.css";
import { CSSProperties } from "react";

export interface ModalProps extends ReactModal.Props {
  background?: string;
  onRequestClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  background,
  ...reactModalProps
}) => {
  const style = {
    overlay: { justifyContent: "center" },
    content: { "--swui-modal-content-bg-color": background } as CSSProperties,
  };

  return (
    <ReactModal
      overlayClassName={styles.overlay}
      className={styles.modal}
      style={style}
      {...reactModalProps}
    >
      <div
        className={styles.content}
        style={{ ["--swui-modal-width" as string]: "fit-content" }}
      >
        {children}
      </div>
    </ReactModal>
  );
};
