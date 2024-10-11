import { Box, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import { PropsWithChildren } from "react";
import styles from "./Cardy.module.css";

export interface CardyBodyProps extends Pick<BoxProps, "gap"> {}

export const CardyBody: React.FC<PropsWithChildren<CardyBodyProps>> = (
  boxProps,
) => {
  return <Box className={styles.cardyIndent} {...boxProps} />;
};
