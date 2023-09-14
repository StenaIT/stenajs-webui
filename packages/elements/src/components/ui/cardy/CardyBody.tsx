import { Box, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./Cardy.module.css";

export interface CardyBodyProps extends Pick<BoxProps, "gap"> {
  children?: ReactNode;
}

export const CardyBody: React.FC<CardyBodyProps> = (boxProps) => {
  return (
    <Box className={styles.cardyIndent} {...boxProps} />
  );
};
