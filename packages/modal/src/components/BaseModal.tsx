import * as React from "react";
import * as ReactModal from "react-modal";
import Draggable from "react-draggable";
import cx from "classnames";

import styles from "./Modal.module.css";

export interface BaseModalProps extends ReactModal.Props {
  width?: string;
  onRequestClose?: () => void;
  draggable?: boolean;
}

export const DRAGGABLE_HANDLE_CLASSNAME = "draggable-modal-handle";

export const BaseModal: React.FC<BaseModalProps> = ({
  width,
  draggable = false,
  children,
  ...reactModalProps
}) => {
  return (
    <ReactModal
      overlayClassName={styles.overlay}
      className={styles.modal}
      {...reactModalProps}
    >
      <Draggable
        handle={`.${DRAGGABLE_HANDLE_CLASSNAME}`}
        bounds=".ReactModal__Overlay"
        disabled={!draggable}
      >
        <div
          style={{ ["--swui-modal-width" as string]: width }}
          className={cx(styles.content, {
            [styles.isDraggable]: draggable
          })}
        >
          {children}
        </div>
      </Draggable>
    </ReactModal>
  );
};
