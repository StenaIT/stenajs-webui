import { Indent, Text, TextSize } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./TextCell.module.css";

interface Props {
  label?: string;
  size?: TextSize;
  color?: string;
}

export const TextCell: React.FC<Props> = React.memo(function TextCell({
  label,
  size,
  color,
}) {
  return (
    <Indent overflow={"hidden"}>
      <Text className={styles.textCell} title={label} size={size} color={color}>
        {label}
      </Text>
    </Indent>
  );
});
