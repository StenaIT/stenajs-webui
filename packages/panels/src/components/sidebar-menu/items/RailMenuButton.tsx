import * as React from "react";
import { IconMenuButton, IconMenuButtonProps } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";

export type RailMenuButtonProps = IconMenuButtonProps & { label: string };

export const RailMenuButton: React.FC<RailMenuButtonProps> = ({
  label,
  ...menuButtonLinkProps
}) => {
  const label2 =
    '    <Tooltip label={label2} placement={"right"} visible>\n' +
    "      <IconMenuButton {...menuButtonLinkProps} />\n" +
    "    </Tooltip>\n";

  return (
    <Tooltip label={label + label2} placement={"right"} visible>
      <IconMenuButton {...menuButtonLinkProps} />
    </Tooltip>
  );
};
