import TippyComponent, {
  TippyProps as TippyComponentProps,
} from "@tippyjs/react";
import * as React from "react";
import styles from "./Popover.module.css";
import "./Tippy.module.css";
import { TippyCallbackRef } from "../../hooks/UseTippyInstance";
import { Box } from "@stenajs-webui/core";
import { useLazyPopover } from "../../hooks/UseLazyPopover";

export type PopoverVariant =
  | "standard"
  | "info"
  | "warning"
  | "error"
  | "outlined";

export interface PopoverProps
  extends Partial<Omit<TippyComponentProps, "theme" | "render">> {
  tippyRef?: TippyCallbackRef<HTMLDivElement>;
  disablePadding?: boolean;
  lazy?: boolean;
  variant?: PopoverVariant;
}

export const tippyStyles = {
  noPadding: styles.noPadding,
};

const variantToTheme: Record<PopoverVariant, string> = {
  standard: "light",
  info: "info",
  warning: "warning",
  error: "error",
  outlined: "outlined",
};

export const Popover: React.FC<PopoverProps> = ({
  visible,
  trigger = "mouseenter",
  children,
  tippyRef,
  delay = 0,
  variant = "standard",
  disablePadding,
  content,
  maxWidth = "500px",
  plugins: propsPlugins,
  lazy,
  arrow = true,
  ...tippyProps
}) => {
  const { plugins, mounted } = useLazyPopover(propsPlugins);

  return (
    <TippyComponent
      interactive
      className={tippyStyles.noPadding}
      trigger={visible !== undefined ? undefined : trigger}
      visible={visible}
      theme={"light " + variantToTheme[variant] ?? variantToTheme.standard}
      delay={delay}
      maxWidth={maxWidth}
      arrow={arrow}
      content={
        (!lazy || mounted) && (
          <Box spacing={!disablePadding && 1} indent={!disablePadding && 1}>
            {content}
          </Box>
        )
      }
      plugins={plugins}
      {...tippyProps}
    >
      <div ref={tippyRef}>{children}</div>
    </TippyComponent>
  );
};
