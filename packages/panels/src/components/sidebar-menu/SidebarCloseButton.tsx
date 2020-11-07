import * as React from "react";
import styles from "./SidebarMenu.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
}

export const SidebarCloseButton: React.FC<SidebarCloseButtonProps> = ({
  label,
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
        <Icon
          icon={faTimes}
          color={"var(--swui-white)"}
          size={10}
          data-hover={true}
        />
        <Indent />
        <SmallText color={"var(--swui-white)"}>
          {label ?? "Close menu"}
        </SmallText>
      </Row>
    </Clickable>
  );
};
