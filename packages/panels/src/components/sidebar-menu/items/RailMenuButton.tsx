import * as React from "react";
import { IconMenuButton, IconMenuButtonProps } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";

export type RailMenuButtonProps = IconMenuButtonProps & { label: string };

export const RailMenuButton: React.FC<RailMenuButtonProps> = ({
  label,
  ...menuButtonLinkProps
}) => {
  return (
    <Tooltip label={label} placement={"right"} appendTo={document.body}>
      <IconMenuButton {...menuButtonLinkProps} />
    </Tooltip>
  );
};
