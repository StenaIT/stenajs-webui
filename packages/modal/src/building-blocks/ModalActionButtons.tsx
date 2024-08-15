import * as React from "react";
import styles from "./ModalActionButtons.module.css";
import { ReactNode } from "react";
import { Box, Spacing } from "@stenajs-webui/core";

export interface ModalActionButtonsProps {
  buttons: ReactNode;
}

export const ModalActionButtons: React.FC<ModalActionButtonsProps> = ({
  buttons,
}) => {
  return (
    <Box width={"100%"}>
      <Spacing />
      <div className={styles.modalActionButtons}>{buttons}</div>
    </Box>
  );
};
