import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";

import styles from "./Modal.module.css";
import { Clickable } from "@stenajs-webui/core";

interface Props {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
}

export const ModalHeader: React.FC<Props> = ({
  onRequestClose,
  header,
  headerText
}) => {
  return (
    <div className={styles.Header + " " + DRAGGABLE_HANDLE_CLASSNAME}>
      {headerText}
      {header}
      <Clickable className={styles.HeaderCloseButton} onClick={onRequestClose}>
        <Icon icon={faTimes} size={16} />
      </Clickable>
    </div>
  );
};
