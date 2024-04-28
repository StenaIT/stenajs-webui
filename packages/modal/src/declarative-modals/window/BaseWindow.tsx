import * as React from "react";
import { useRef } from "react";
import ReactModal from "react-modal";
import Draggable from "react-draggable";
import cx from "classnames";
import styles from "./Window.module.css";

export interface BaseWindowProps extends ReactModal.Props {
  width?: string;
  maxWidth?: string;
  onRequestClose?: () => void;
  draggable?: boolean;
}

export const DRAGGABLE_HANDLE_CLASSNAME = "draggable-modal-handle";
export const DRAGGABLE_CANCEL_CLASSNAME = "draggable-modal-cancel";

export const BaseWindow: React.FC<BaseWindowProps> = ({
  width,
  maxWidth,
  draggable = false,
  children,
  ...reactModalProps
}) => {
  const nodRef = useRef(null);
  return (
    <ReactModal
      overlayClassName={styles.overlay}
      className={styles.modal}
      {...reactModalProps}
    >
      <Draggable
        handle={`.${DRAGGABLE_HANDLE_CLASSNAME}`}
        cancel={`.${DRAGGABLE_CANCEL_CLASSNAME}, button, [role="tooltip"]`}
        bounds=".ReactModal__Overlay"
        disabled={!draggable}
        nodeRef={nodRef}
      >
        <div
          style={{
            ["--swui-modal-width" as string]: width,
            ["--swui-modal-max-width" as string]: maxWidth,
          }}
          className={cx(styles.content, {
            [styles.isDraggable]: draggable,
          })}
          ref={nodRef}
        >
          {children}
        </div>
      </Draggable>
    </ReactModal>
  );
};
