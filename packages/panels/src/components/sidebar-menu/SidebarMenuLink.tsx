import { CollapsibleSimpleContentProps } from "../..";
import {
  Box,
  ButtonElementProps,
  Clickable,
  StandardText,
} from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@stenajs-webui/elements";

interface SidebarMenuClickableContentProps
  extends CollapsibleSimpleContentProps,
    ButtonElementProps {
  selected?: boolean;
  iconLeft?: IconDefinition;
}

export const SidebarMenuLink: React.FC<SidebarMenuClickableContentProps> = ({
  iconLeft,
  className,
  onClick,
  children,
  selected,
  ...props
}) => {
  const selectedClass: string = styles.selectedMenuItem;
  return (
    <Clickable
      disableFocusHighlight
      disableOpacityOnClick
      className={cx(styles.contentLink, className, {
        [selectedClass]: selected,
      })}
      onClick={onClick}
      {...props}
    >
      <Box spacing={1} flex={1} flexDirection={"row"}>
        {iconLeft && (
          <Box width={56} alignItems={"center"} justifyContent={"center"}>
            <div className={styles.contentLeft}>
              {<Icon icon={iconLeft} size={24} data-hover={true} />}
            </div>
          </Box>
        )}
        <StandardText>{children}</StandardText>
      </Box>
    </Clickable>
  );
};
