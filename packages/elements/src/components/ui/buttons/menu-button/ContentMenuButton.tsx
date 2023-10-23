import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { LabelElementProps, Row } from "@stenajs-webui/core";
import styles from "./ContentMenuButton.module.css";

export interface ContentMenuButtonProps extends LabelElementProps {
  children?: ReactNode;
}

export const ContentMenuButton = forwardRef<
  HTMLLabelElement,
  ContentMenuButtonProps
>(({ children, ...labelProps }, ref) => {
  return (
    <label className={styles.contentMenuButton} ref={ref} {...labelProps}>
      <Row justifyContent={"flex-start"} alignItems={"center"} indent={2}>
        {children}
      </Row>
    </label>
  );
});
