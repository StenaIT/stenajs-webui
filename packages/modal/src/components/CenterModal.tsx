import * as React from "react";
import * as ReactModal from "react-modal";

import styles from "./Modal.module.css";

export interface CenterModalProps extends ReactModal.Props {
  onRequestClose?: () => void;
}

const style = { overlay: { justifyContent: "center" } };

export const CenterModal: React.FC<CenterModalProps> = ({
  children,
  ...reactModalProps
}) => {
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
