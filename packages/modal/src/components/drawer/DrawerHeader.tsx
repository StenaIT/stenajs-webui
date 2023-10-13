import * as React from "react";
import { ReactNode } from "react";
import { Heading, Row, Space, Spacing } from "@stenajs-webui/core";
import { FlatButton, Icon, stenaTimes } from "@stenajs-webui/elements";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";

export interface DrawerHeaderProps {
  onRequestClose: () => void;
  header?: string;
  contentRight?: ReactNode;
  icon?: IconDefinition;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  header,
  contentRight,
  onRequestClose,
  icon,
}) => {
  return (
    <Spacing
      position={"sticky"}
      top={0}
      zIndex={100}
      background={cssColor("--lhds-color-ui-50")}
    >
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"48px"}
      >
        <Row alignItems={"center"} gap={2}>
          <Space num={1} />
          {icon && <Icon icon={icon} size={24} />}
          <Heading variant={"h4"}>{header}</Heading>
        </Row>
        <Row gap={1}>
          {contentRight}
          <FlatButton
            leftIcon={stenaTimes}
            onClick={onRequestClose}
            variant={"danger"}
          />
          <Space num={0.5} />
        </Row>
      </Row>
    </Spacing>
  );
};
