import TippyComponent, {
  TippyProps as TippyComponentProps
} from "@tippyjs/react";
import * as React from "react";
import styles from "./Popover.module.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { TippyCallbackRef } from "../../hooks/UseTippyInstance";
import { Box } from "@stenajs-webui/core";

export type PopoverVariant = "standard" | "info" | "warning" | "error";

export interface PopoverProps extends Omit<TippyComponentProps, "theme"> {
  tippyRef?: TippyCallbackRef<HTMLDivElement>;
  disablePadding?: boolean;
  variant?: PopoverVariant;
}

export const tippyStyles = {
  noPadding: styles.noPadding
};

const variantToTheme: Record<PopoverVariant, string> = {
  standard: "light",
  info: "info",
  warning: "warning",
  error: "error"
};

export const Popover: React.FC<PopoverProps> = ({
  trigger = "mouseenter",
  children,
  tippyRef,
  variant = "standard",
  disablePadding,
  content,
  ...tippyProps
}) => (
  <TippyComponent
    interactive
    className={tippyStyles.noPadding}
    trigger={trigger}
    theme={"light " + variantToTheme[variant] ?? variantToTheme.standard}
    delay={0}
    content={
      <Box spacing={!disablePadding && 1} indent={!disablePadding && 1}>
        {content}
      </Box>
    }
    {...tippyProps}
  >
    <div ref={tippyRef}>{children}</div>
  </TippyComponent>
);
