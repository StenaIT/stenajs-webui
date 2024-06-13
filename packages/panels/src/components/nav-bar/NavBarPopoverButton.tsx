import { useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { NavBarButton, NavBarButtonProps } from "./NavBarButton";
import { Popover } from "@stenajs-webui/tooltip";

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
    <Popover
      onClickOutside={close}
      triggerTarget={document.body}
      visible={isOpen}
      content={
        <>
          {content && content({ close })}
          {children}
        </>
      }
    >
      <NavBarButton {...navBarButtonProps} onClick={toggle} />
    </Popover>
  );
};
