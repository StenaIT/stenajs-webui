import { Box, BoxProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { PropsWithChildren } from "react";
import styles from "./Cardy.module.css";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Spinner } from "../spinner/Spinner";

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
  noPaddingBottom,
  className,
  ...boxProps
}) => {
  return (
    <div style={{ position: "relative" }}>
      <Box
        background={cssColor(color)}
        position={loading ? "relative" : undefined}
        className={cx(styles.cardy, noPaddingBottom && styles.noPaddingBottom)}
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
            background={"rgba(255, 255, 255, 0.7)"}
          >
            <Spinner />
          </Box>
        )}
      </Box>
    </div>
  );
};
