import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FlatButton } from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import { DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import styles from "./Modal.module.css";
import { Box } from "@stenajs-webui/core";

interface Props {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
}

export const ModalHeader: React.FC<Props> = ({
  onRequestClose,
  header,
  headerText,
}) => {
  return (
    <div className={cx(styles.header, DRAGGABLE_HANDLE_CLASSNAME)}>
      {headerText}
      {header}
      <Box alignSelf={"flex-start"}>
        <FlatButton onClick={onRequestClose} leftIcon={faTimes} />
      </Box>
    </div>
  );
};
