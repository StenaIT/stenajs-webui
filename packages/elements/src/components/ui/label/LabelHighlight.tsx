import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { cssColor } from "@stenajs-webui/theme";
import { Column } from "@stenajs-webui/core";

export type LabelHighlightVariant = "none" | "warning" | "success" | "error";

export interface LabelHighlightProps extends PropsWithChildren {
  variant?: LabelHighlightVariant;
  label: ReactNode;
}

export const LabelHighlight: React.FC<LabelHighlightProps> = ({
  variant = "warning",
  label,
  children,
}) => {
  return (
    <Column
      borderRadius={"var(--swui-border-radius-large)"}
      spacing={2}
      indent={2}
      gap={2}
      background={getColor(variant)}
    >
      {label}
      {children}
    </Column>
  );
};

const getColor = (variant: LabelHighlightVariant): string | undefined => {
  switch (variant) {
    case "none":
      return undefined;
    case "error":
      return cssColor("--lhds-color-red-100");
    case "warning":
      return cssColor("--lhds-color-orange-100");
    case "success":
      return cssColor("--lhds-color-green-100");
  }
};
