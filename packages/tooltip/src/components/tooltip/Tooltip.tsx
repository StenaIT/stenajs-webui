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
}

const variantIcons = {
  info: stenaInfoCircle,
  warning: stenaExclamationCircle,
  error: stenaExclamationTriangle,
};

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  trigger = "mouseenter",
  children,
  tippyRef,
  delay = 0,
  variant,
  content,
  maxWidth = "125px",
  arrow = true,
  label,
  ...tippyProps
}) => {
  const textComponent = (
    <Indent display={"inline-block"} indent={1}>
      <Text color="white" size={"small"} variant="bold">
        {label}
      </Text>
    </Indent>
  );

  return (
    <TippyComponent
      interactive
      className={styles.noPadding}
      trigger={visible !== undefined ? undefined : trigger}
      visible={visible}
      theme={"dark"}
      delay={delay}
      maxWidth={maxWidth}
      arrow={arrow}
      content={
        <Row spacing={0.5} indent={0.5} alignItems="center">
          {variant ? (
            <>
              <div className={cx(styles.iconWrapper, styles[variant])}>
                <Icon icon={variantIcons[variant]} size={16} />
              </div>
              {textComponent}
            </>
          ) : (
            textComponent
          )}
        </Row>
      }
      {...tippyProps}
    >
      <div ref={tippyRef}>{children}</div>
    </TippyComponent>
  );
};
