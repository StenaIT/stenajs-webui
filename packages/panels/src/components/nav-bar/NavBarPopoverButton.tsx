import * as React from "react";
import { ReactNode } from "react";
import { NavBarButton, NavBarButtonProps } from "./NavBarButton";
import { Popover } from "@stenajs-webui/tooltip";
import { Box, Row } from "@stenajs-webui/core";

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
  return (
    <Popover
      renderTrigger={(props) => (
        <Row {...props}>
          <NavBarButton {...navBarButtonProps} />
        </Row>
      )}
      trigger={"click"}
    >
      {({ onRequestClose }) => (
        <Box>
          {content && content({ close: onRequestClose })}
          {children}
        </Box>
      )}
    </Popover>
  );
};
