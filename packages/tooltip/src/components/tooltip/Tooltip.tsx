import { Indent, Row, Text } from "@stenajs-webui/core";
import {
  Icon,
  stenaExclamationCircle,
  stenaExclamationTriangle,
  stenaInfoCircle,
} from "@stenajs-webui/elements";
import TippyComponent, {
  TippyProps as TippyComponentProps,
} from "@tippyjs/react";
import cx from "classnames";
import * as React from "react";
import { TippyCallbackRef } from "../../hooks/UseTippyInstance";
import styles from "./Tooltip.module.css";

type TooltipVariant = "info" | "warning" | "error";

interface TippyProps
  extends Partial<Omit<TippyComponentProps, "theme" | "render">> {
  tippyRef?: TippyCallbackRef<HTMLDivElement>;
}

export interface TooltipProps extends TippyProps {
  variant?: TooltipVariant;
  label: string;
  multiRow?: boolean;
}

const variantIcons = {
  info: stenaInfoCircle,
  warning: stenaExclamationCircle,
  error: stenaExclamationTriangle,
};

const textComponent = (label: string, maxWidth: number) => (
  <Indent spacing={0.5} display={"inline-block"}>
    <Text
      color="white"
      size={"small"}
      variant="bold"
      style={{ display: "flex", maxWidth: maxWidth }}
    >
      {label}
    </Text>
  </Indent>
);

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  trigger = "mouseenter",
  children,
  tippyRef,
  delay = 0,
  variant,
  content,
  multiRow,
  arrow = true,
  label,
  ...tippyProps
}) => {
  return (
    <TippyComponent
      interactive
      className={styles.noPadding}
      trigger={visible !== undefined ? undefined : trigger}
      visible={visible}
      theme={"dark"}
      delay={delay}
      arrow={arrow}
      content={
        <Row spacing={0.5} indent={0.5}>
          {variant ? (
            <>
              <div className={cx(styles.iconWrapper, styles[variant])}>
                <Icon icon={variantIcons[variant]} size={16} />
              </div>
              {textComponent(label, multiRow ? 100 : -1)}
            </>
          ) : (
            textComponent(label, multiRow ? 100 : -1)
          )}
        </Row>
      }
      {...tippyProps}
    >
      <div ref={tippyRef}>{children}</div>
    </TippyComponent>
  );
};
