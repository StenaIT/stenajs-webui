import * as React from "react";
import styles from "./SidebarMenu.module.css";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@stenajs-webui/elements";
import {
  ButtonElementProps,
  Clickable,
  Indent,
  Row,
  SmallText,
} from "@stenajs-webui/core";
import { CollapsibleSimpleContentProps } from "../collapsible/CollapsibleContent";

export interface SidebarCloseButtonProps
  extends CollapsibleSimpleContentProps,
    ButtonElementProps {
  label?: string;
  leftIcon?: IconDefinition;
}

export const SidebarCloseButton: React.FC<SidebarCloseButtonProps> = ({
  label = "Close menu",
  leftIcon,
  onClick,
  children,
  ...props
}) => {
  return (
    <Clickable
      disableFocusHighlight
      disableOpacityOnClick
      onClick={onClick}
      {...props}
    >
      <Row
        className={styles.closeButton}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        {leftIcon && (
          <>
            <Icon
              icon={leftIcon}
              color={"var(--swui-sidebarmenu-text-color)"}
              size={10}
              data-hover={true}
            />
            <Indent />
          </>
        )}
        <SmallText color={"var(--swui-sidebarmenu-text-color)"}>
          {label}
        </SmallText>
      </Row>
    </Clickable>
  );
};
