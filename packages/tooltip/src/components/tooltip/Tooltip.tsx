import { Indent, Row, Text } from "@stenajs-webui/core";
import {
  Icon,
  stenaExclamationCircle,
  stenaExclamationTriangle,
  stenaInfoCircle,
} from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import styles from "./Tooltip.module.css";
import { Popover, PopoverProps } from "../popover/Popover";
import { cssColor } from "@stenajs-webui/theme";

type TooltipVariant = "info" | "warning" | "error";

const variantIcons = {
  info: stenaInfoCircle,
  warning: stenaExclamationCircle,
  error: stenaExclamationTriangle,
};

export interface TooltipProps
  extends Partial<Omit<PopoverProps, "theme" | "render">> {
  label: string;
  maxWidth?: number;
  variant?: TooltipVariant;
  children: JSX.Element;
}

const TooltipText: React.FC<{ label: string; maxWidth?: number }> = ({
  label,
  maxWidth,
}) => (
  <Indent spacing={0.5} display={"inline-block"}>
    <Text
      color={cssColor("--lhds-color-ui-50")}
      size={"small"}
      variant="bold"
      style={{ display: "flex", maxWidth: maxWidth }}
    >
      {label}
    </Text>
  </Indent>
);

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  maxWidth,
  variant,
  children,
  ...popoverProps
}) => {
  return (
    <Popover
      theme="dark"
      {...popoverProps}
      disablePadding={true}
      content={
        <Row spacing={0.5} indent={0.5}>
          {variant ? (
            <>
              <div className={cx(styles.iconWrapper, styles[variant])}>
                <Icon icon={variantIcons[variant]} size={16} />
              </div>
              <TooltipText label={label} maxWidth={maxWidth} />
            </>
          ) : (
            <TooltipText label={label} maxWidth={maxWidth} />
          )}
        </Row>
      }
    >
      {children}
    </Popover>
  );
};
