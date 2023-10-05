import * as React from "react";
import {
  MenuButton,
  MenuButtonProps,
  stenaAngleLeftDouble,
  stenaPin,
} from "@stenajs-webui/elements";

export interface SidebarMenuPinButtonProps {
  isPinned?: boolean;
  label?: string;
  onClick?: MenuButtonProps["onClick"];
}

export const SidebarMenuPinButton: React.FC<SidebarMenuPinButtonProps> = ({
  isPinned,
  onClick,
  label,
}) => {
  const pinLabel = isPinned ? "Unpin menu" : "Pin menu";
  const activeLabel = label ?? pinLabel;
  const activeIcon = isPinned ? stenaAngleLeftDouble : stenaPin;

  return (
    <MenuButton onClick={onClick} label={activeLabel} leftIcon={activeIcon} />
  );
};
