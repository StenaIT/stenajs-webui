import * as React from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../icon/Icon";
import styles from "./MenuButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface MenuButtonContentProps {
  leftIcon?: IconDefinition;
  label?: string;
}

export const MenuButtonContent: React.FC<MenuButtonContentProps> = ({
  label,
  leftIcon,
}) => {
  return (
    <Row gap={2}>
      {leftIcon && (
        <>
          <Box alignItems={"center"} justifyContent={"center"} width={"20px"}>
            <Icon
              icon={leftIcon}
              size={20}
              color={"var(--current-text-color)"}
              data-hover={true}
            />
          </Box>
        </>
      )}
      {label && (
        <Text
          variant={"bold"}
          className={styles.label}
          color={"var(--current-text-color)"}
        >
          {label}
        </Text>
      )}
    </Row>
  );
};
