import { Text, Space } from "@stenajs-webui/core";
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

export interface TooltipProps extends Omit<PopoverProps, "theme" | "render"> {
  label: string;
  variant?: TooltipVariant;
  children: JSX.Element;
}

const TooltipText: React.FC<{ label: string }> = ({ label }) => (
  <Text color={cssColor("--lhds-color-ui-50")} size={"small"} variant="bold">
    {label}
  </Text>
);

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  variant,
  children,
  ...popoverProps
}) => (
  <Popover
    theme="dark"
    {...popoverProps}
    disablePadding
    content={
      <div className={cx(styles.tooltip, variant ? styles.withIcon : null)}>
        {variant ? (
          <>
            <div className={cx(styles.iconWrapper, styles[variant])}>
              <Icon icon={variantIcons[variant]} size={16} />
            </div>
            <Space />
            <TooltipText label={label} />
          </>
        ) : (
          <TooltipText label={label} />
        )}
      </div>
    }
  >
    {children}
  </Popover>
);
