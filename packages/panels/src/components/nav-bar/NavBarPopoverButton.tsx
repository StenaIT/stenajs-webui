import * as React from "react";
import { ReactNode } from "react";
import { NavBarButton, NavBarButtonProps } from "./NavBarButton";
import { ControlledPopover } from "@stenajs-webui/tooltip";
import { Box, useBoolean } from "@stenajs-webui/core";

type RenderProp = (args: RenderPropArgs) => ReactNode;

interface RenderPropArgs {
  close: () => void;
}

export interface NavBarPopoverButtonProps
  extends Omit<NavBarButtonProps, "onClick" | "content"> {
  content?: RenderProp;
}

export const NavBarPopoverButton: React.FC<NavBarPopoverButtonProps> = ({
  content,
  children,
  ...navBarButtonProps
}) => {
  const [isOpen, , close, toggle] = useBoolean(false);

  return (
    <ControlledPopover
      renderTrigger={(props) => (
        <NavBarButton {...navBarButtonProps} {...props} onClick={toggle} />
      )}
      open={isOpen}
      onRequestClose={close}
    >
      <Box>
        {content && content({ close })}
        {children}
      </Box>
    </ControlledPopover>
  );
};
