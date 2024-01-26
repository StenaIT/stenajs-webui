import * as React from "react";
import styles from "./ModalActionButtons.module.css";
import { ReactNode } from "react";

export interface ModalActionButtonsProps {
  buttons: ReactNode;
}

export const ModalActionButtons: React.FC<ModalActionButtonsProps> = ({
  buttons,
}) => {
  return <div className={styles.modalActionButtons}>{buttons}</div>;
};
