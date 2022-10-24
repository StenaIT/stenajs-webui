import { Column } from "@stenajs-webui/core";
import { PrimaryButton, PrimaryButtonProps } from "@stenajs-webui/elements";
import * as React from "react";

export interface StickySearchButtonProps extends PrimaryButtonProps {}

export const StickySearchButton: React.FC<StickySearchButtonProps> = ({
  ...buttonProps
}) => {
  return (
    <Column
      style={{ marginTop: "auto" }}
      justifyContent={"center"}
      spacing={2}
      indent
      shadow={"popover"}
      zIndex={1}
    >
      <PrimaryButton {...buttonProps} />
    </Column>
  );
};
