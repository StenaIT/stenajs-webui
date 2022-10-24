import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface StickySearchButtonProps extends Pick<BoxProps, "gap"> {
  children?: ReactNode;
}

export const StickyFooter: React.FC<StickySearchButtonProps> = ({
  children,
  ...boxProps
}) => {
  return (
    <Column
      style={{ marginTop: "auto" }}
      justifyContent={"center"}
      spacing={2}
      indent
      shadow={"popover"}
      zIndex={1}
      {...boxProps}
    >
      {children}
    </Column>
  );
};
