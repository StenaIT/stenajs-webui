import { Box, getDataProps, Heading, Row, Space } from "@stenajs-webui/core";
import { ReactNode } from "react";
import * as React from "react";

import styles from "./Cardy.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/Icon";

export interface CardyHeaderProps {
  text: string;
  leftIcon?: IconDefinition;
  right?: ReactNode;
}

export const CardyHeader: React.FC<CardyHeaderProps> = ({
  text,
  right,
  leftIcon,
  ...props
}) => {
  return (
    <Box className={styles.cardyIndent}>
      <Row alignItems={"center"} justifyContent={"space-between"} gap={2}>
        <Row alignItems={"center"} gap={2}>
          {leftIcon && (
            <Icon icon={leftIcon} size={"var(--swui-heading-font-size)"} />
          )}
          <Heading {...getDataProps(props)}>{text}</Heading>
        </Row>
        {right}
      </Row>
      <Space num={3} />
    </Box>
  );
};
