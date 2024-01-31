import * as React from "react";
import ReactModal from "react-modal";

import styles from "./Alert.module.css";

export interface AlertProps extends ReactModal.Props {
  onRequestClose?: () => void;
}

const style = { overlay: { justifyContent: "center" } };

export const Alert: React.FC<AlertProps> = ({
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
