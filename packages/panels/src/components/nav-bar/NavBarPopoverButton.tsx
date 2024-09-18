import * as React from "react";
import { ReactNode } from "react";
import { NavBarButton, NavBarButtonProps } from "./NavBarButton";
import {
  ControlledPopover,
  ControlledPopoverProps,
} from "@stenajs-webui/tooltip";
import { Box, useBoolean } from "@stenajs-webui/core";

type RenderProp = (args: RenderPropArgs) => ReactNode;

interface RenderPropArgs {
  close: () => void;
}

export interface NavBarPopoverButtonProps
  extends Omit<NavBarButtonProps, "onClick" | "content">,
    Pick<ControlledPopoverProps, "zIndex" | "appendTo"> {
  content?: RenderProp;
}

export const NavBarPopoverButton: React.FC<NavBarPopoverButtonProps> = ({
  content,
  children,
  appendTo,
  zIndex,
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
      zIndex={zIndex}
      appendTo={appendTo}
    >
      <Box>
        {content && content({ close })}
        {children}
      </Box>
    </ControlledPopover>
  );
};
