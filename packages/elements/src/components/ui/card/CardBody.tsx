import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export type CardBodyVariant = "standard" | "compact";

interface CardBodyProps extends Omit<BoxProps, "indent" | "spacing"> {
  variant?: CardBodyVariant;
}

export const CardBody: React.FC<CardBodyProps> = ({
  variant = "standard",
  ...props
}) => <Column indent={3} spacing={variant === "compact" ? 1 : 3} {...props} />;
