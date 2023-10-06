import * as React from "react";
import {
  IconMenuButtonLink,
  MenuButtonLinkNotSelectedProps,
  MenuButtonLinkWithRenderLinkProps,
  MenuButtonLinkWithSelectedProps,
} from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";

export type RailMenuLinkProps =
  | (
      | MenuButtonLinkNotSelectedProps
      | MenuButtonLinkWithSelectedProps
      | MenuButtonLinkWithRenderLinkProps
    ) & { label: string };

export const RailMenuLink: React.FC<RailMenuLinkProps> = ({
  label,
  leftIcon,
  ...menuButtonLinkProps
}) => {
  if (leftIcon == null) {
    return null;
  }

  return (
    <Tooltip label={label} placement={"right"} appendTo={document.body}>
      <IconMenuButtonLink icon={leftIcon} {...menuButtonLinkProps} />
    </Tooltip>
  );
};
