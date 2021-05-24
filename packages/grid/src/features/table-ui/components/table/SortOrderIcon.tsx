import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons/faSortAlphaDown";
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons/faSortAlphaUp";
import { faSortAmountDownAlt } from "@fortawesome/free-solid-svg-icons/faSortAmountDownAlt";
import { faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons/faSortAmountUpAlt";
import { faSortNumericDown } from "@fortawesome/free-solid-svg-icons/faSortNumericDown";
import { faSortNumericUp } from "@fortawesome/free-solid-svg-icons/faSortNumericUp";
import { exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";

export type SortOrderDirection = "up" | "down";
export type SortOrderIconVariant = "numeric" | "alpha" | "amount";

interface Props {
  direction: SortOrderDirection;
  iconVariant?: SortOrderIconVariant;
}

export const SortOrderIcon: React.FC<Props> = ({
  iconVariant = "amount",
  direction,
}) => {
  return (
    <Icon
      size={14}
      color={cssColor("--lhds-color-ui-500")}
      icon={getIcon(direction, iconVariant)}
    />
  );
};

export const getIcon = (
  arrow: SortOrderDirection,
  iconType: SortOrderIconVariant
): IconDefinition => {
  switch (iconType) {
    case "alpha":
      return arrow === "up" ? faSortAlphaUp : faSortAlphaDown;
    case "numeric":
      return arrow === "up" ? faSortNumericUp : faSortNumericDown;
    case "amount":
      return arrow === "up" ? faSortAmountUpAlt : faSortAmountDownAlt;
    default:
      return exhaustSwitchCaseElseThrow(iconType);
  }
};
