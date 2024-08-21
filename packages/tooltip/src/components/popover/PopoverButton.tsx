import * as React from "react";
import { ReactNode } from "react";
import { Popover2, Popover2Props } from "./Popover2";
import { useBoolean } from "@stenajs-webui/core";

export type PopoverButtonRenderer = (
  args: PopoverButtonRendererArgs
) => ReactNode;

export interface PopoverButtonRendererArgs {
  onClick: () => void;
}

export interface PopoverButtonProps extends Omit<Popover2Props, "children"> {
  renderButton: PopoverButtonRenderer;
}

export const PopoverButton: React.FC<PopoverButtonProps> = ({
  renderButton,
  ...popoverProps
}) => {
  const [isOpen, open, close] = useBoolean(false);
  return (
    <Popover2 {...popoverProps} visible={isOpen} onRequestClose={close}>
      {renderButton({ onClick: open })}
    </Popover2>
  );
};
