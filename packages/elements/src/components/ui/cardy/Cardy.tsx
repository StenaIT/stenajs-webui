import { Box, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import { PropsWithChildren } from "react";
import styles from "./Cardy.module.css";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Spinner } from "../spinner/Spinner";
import cx from "classnames";

interface CardyProps extends Pick<BoxProps, "minWidth"> {
  color?: CssPropColor;
  loading?: boolean;
  noPaddingBottom?: boolean;
  className?: string;
}

export const Cardy: React.FC<PropsWithChildren<CardyProps>> = ({
  children,
  color = cssColor("--lhds-color-ui-200"),
  loading,
  className,
  ...boxProps
}) => {
  return (
    <Box
      background={color}
      position={loading ? "relative" : undefined}
      className={cx(styles.cardy, className)}
      {...boxProps}
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
