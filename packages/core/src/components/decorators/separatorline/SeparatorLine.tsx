import { Property } from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import { cssColor } from "@stenajs-webui/theme";
import styles from "./SeparatorLine.module.css";

export interface SeparatorLineProps {
  color?: Property.Color;
  vertical?: boolean;
  size?: string;
  width?: string;
}

export const SeparatorLine = forwardRef<HTMLHRElement, SeparatorLineProps>(
  (
    {
      color = cssColor("--lhds-color-ui-300"),
      size = "100%",
      width = "1px",
      vertical = false,
    },
    ref,
  ) => {
    return (
      <hr
        className={styles.separatorLine}
        aria-hidden={true}
        color={color}
        style={{
          backgroundColor: color,
          height: vertical ? size || "100%" : width || "1px",
          width: vertical ? width || "1px" : size || "100%",
        }}
        ref={ref}
      />
    );
  },
);
