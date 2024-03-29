import { Box, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./Cardy.module.css";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Spinner } from "../spinner/Spinner";
import cx from "classnames";

export interface CardyProps extends Omit<BoxProps, "background" | "position"> {
  color?: CssPropColor;
  loading?: boolean;
}

export const Cardy: React.FC<CardyProps> = ({
  children,
  color = "--lhds-color-ui-200",
  loading,
  className,
  ...boxProps
}) => {
  return (
    <Box
      {...boxProps}
      background={cssColor(color)}
      position={loading ? "relative" : undefined}
      className={cx(styles.cardy, className)}
    >
      {children}
      {loading && (
        <Box
          top={0}
          bottom={0}
          left={0}
          right={0}
          position={"absolute"}
          justifyContent={"center"}
          alignItems={"center"}
          background={"var(--swui-overlay-bg-color-light)"}
        >
          <Spinner />
        </Box>
      )}
    </Box>
  );
};
