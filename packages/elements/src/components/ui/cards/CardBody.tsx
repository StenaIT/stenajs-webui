import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { CARD_INDENT, CARD_SPACING, CARD_SPACING_COMPACT } from "./Card";

export type CardBodyVariant = "standard" | "compact";

export interface CardBodyProps extends Omit<BoxProps, "indent" | "spacing"> {
  variant?: CardBodyVariant;
}

export const CardBody: React.FC<CardBodyProps> = ({
  variant = "standard",
  ...props
}) => (
  <Column
    indent={CARD_INDENT}
    spacing={variant === "compact" ? CARD_SPACING_COMPACT : CARD_SPACING}
    {...props}
  />
);
