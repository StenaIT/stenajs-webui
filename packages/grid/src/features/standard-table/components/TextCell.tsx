import { Indent, Text } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./TextCell.module.css";

interface Props {
  label?: string;
}

export const TextCell: React.FC<Props> = React.memo(function TextCell({
  label,
}) {
  return (
    <Indent overflow={"hidden"}>
      <Text className={styles.textCell} title={label}>
        {label}
      </Text>
    </Indent>
  );
});
