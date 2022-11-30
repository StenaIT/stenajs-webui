import { Indent, Row, Text } from "@stenajs-webui/core";
import {
  Icon,
  stenaExclamationCircle,
  stenaExclamationTriangle,
  stenaInfoCircle,
  Tag,
} from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Popover, PopoverProps, PopoverVariant } from "../popover/Popover";

const variantIcons = {
  info: stenaInfoCircle,
  warning: stenaExclamationCircle,
  error: stenaExclamationTriangle,
};

const variantIconColors = {
  info: cssColor("--lhds-color-blue-700"),
  warning: cssColor("--lhds-color-orange-700"),
  error: cssColor("--lhds-color-red-700"),
};

export interface TooltipProps extends Partial<Omit<PopoverProps, "content">> {
  variant?: PopoverVariant;
  label: string;
}

const renderVariant = (variant: PopoverVariant, label: string) => {
  if (
    variant === undefined ||
    variant === "standard" ||
    variant === "outlined"
  ) {
    return (
      <Text color="white" size={"small"} fontWeight="bold">
        {label}
      </Text>
    );
  }
  return (
    <Row>
      <Tag
        variant={variant}
        icon={
          <Icon
            icon={variantIcons[variant]}
            color={variantIconColors[variant]}
            size={16}
          />
        }
      />

      <Indent display={"inline-block"}>
        <Text color="white" size={"small"} fontWeight="bold">
          {label}
        </Text>
      </Indent>
    </Row>
  );
};

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  variant,
  ...popoverProps
}) => {
  return (
    <Popover
      lightMode="dark"
      content={renderVariant(variant ?? "standard", label)}
      {...popoverProps}
    />
  );
};
