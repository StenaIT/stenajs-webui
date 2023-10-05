import * as React from "react";
import {
  MenuButtonLink,
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
  ...menuButtonLinkProps
}) => {
  if (menuButtonLinkProps.leftIcon == null) {
    return null;
  }

  return (
    <Tooltip label={label} placement={"right"} appendTo={document.body}>
      <MenuButtonLink {...menuButtonLinkProps} />
    </Tooltip>
  );
};
