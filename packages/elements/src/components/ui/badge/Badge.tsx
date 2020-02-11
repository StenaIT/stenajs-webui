import { Box, SmallText } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps {
  color?: string;
  textColor?: string;
  label?: string | number;
  size?: string | number;
}

export const Badge: React.FC<BadgeProps> = React.memo(
  ({
    textColor = "var(--swui-badge-text-color)",
    color = "var(--swui-badge-bg-color)",
    size = "var(--swui-badge-size)",
    label
  }) => {
    return (
      <Box
        className={styles.badge}
        overflow={"hidden"}
        borderRadius={"50%"}
        borderWidth={"0px"}
        background={color}
        width={size}
        height={size}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <SmallText color={textColor}>{label}</SmallText>
      </Box>
    );
  }
);
