import { CollapsibleSimpleContentProps } from "../..";
import {
  Box,
  Clickable,
  ClickableProps,
  Indent,
  Row,
  StandardText,
} from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@stenajs-webui/elements";

interface SidebarMenuClickableContentProps
  extends CollapsibleSimpleContentProps,
    ClickableProps {
  selected?: boolean;
  label?: string;
  iconLeft?: IconDefinition;
}

export const SidebarMenuLink: React.FC<SidebarMenuClickableContentProps> = ({
  iconLeft,
  className,
  children,
  selected,
  label,
  ...clickableProps
}) => {
  return (
    <Clickable
      className={cx(styles.contentLink, className, {
        [styles.selectedMenuItem]: selected,
      })}
      {...clickableProps}
    >
      <Row spacing={1} flex={1} alignItems={"center"}>
        {iconLeft ? (
          <Box width={"56px"} alignItems={"center"} justifyContent={"center"}>
            <Icon
              icon={iconLeft}
              size={18}
              data-hover={true}
              color={"var(--swui-sidebar-menu-icon-color)"}
            />
          </Box>
        ) : (
          <Indent num={1} />
        )}
        <StandardText>{label}</StandardText>
      </Row>
    </Clickable>
  );
};
