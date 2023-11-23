import * as React from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../../icon/Icon";
import styles from "../MenuButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface MenuButtonContentProps {
  leftIcon?: IconDefinition;
  left?: ReactNode;
  label: string;
  rightIcon?: IconDefinition;
  right?: ReactNode;
}

export const MenuButtonContent: React.FC<MenuButtonContentProps> = ({
  label,
  leftIcon,
  left,
  right,
  rightIcon,
}) => {
  return (
    <Row flex={1} gap={2} alignItems={"center"}>
      <MenuButtonAside content={left} icon={leftIcon} />
      {label && (
        <Text
          variant={"bold"}
          className={styles.label}
          color={"var(--current-text-color)"}
        >
          {label}
        </Text>
      )}
      <MenuButtonAside content={right} icon={rightIcon} />
    </Row>
  );
};

function MenuButtonAside({
  content,
  icon,
}: {
  content?: ReactNode;
  icon?: IconDefinition;
}) {
  if (content) {
    return <>{content}</>;
  } else if (icon) {
    return (
      <Box alignItems={"center"} justifyContent={"center"} width={"20px"}>
        <Icon
          icon={icon}
          size={20}
          color={"var(--current-text-color)"}
          data-hover={true}
        />
      </Box>
    );
  }

  return null;
}
