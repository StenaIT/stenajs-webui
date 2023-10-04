import * as React from "react";
import { FlatButtonLink, FlatButtonLinkProps } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface RailMenuLinkProps {
  onClick: FlatButtonLinkProps["onClick"];
  label: string;
  leftIcon?: IconDefinition;
}

export const RailMenuLink: React.FC<RailMenuLinkProps> = ({
  label,
  leftIcon,
  onClick,
}) => {
  if (leftIcon == null) {
    return null;
  }

  return (
    <Tooltip label={label} placement={"right-start"} appendTo={"parent"}>
      <FlatButtonLink leftIcon={leftIcon} onClick={onClick} />
    </Tooltip>
  );
};
