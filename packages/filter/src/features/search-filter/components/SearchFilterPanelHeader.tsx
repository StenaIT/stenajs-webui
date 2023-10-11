import * as React from "react";
import { ReactNode } from "react";
import { FlatButton, stenaTimes } from "@stenajs-webui/elements";
import { Heading, Row, Space, Spacing } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";

interface SearchFilterPanelHeaderProps {
  onRequestClose: () => void;
  header?: string;
  contentRight?: ReactNode;
}

export const SearchFilterPanelHeader: React.FC<
  SearchFilterPanelHeaderProps
> = ({ onRequestClose, header = "Filter", contentRight }) => {
  return (
    <Spacing
      position={"sticky"}
      top={0}
      background={cssColor("--lhds-color-ui-50")}
      zIndex={100}
    >
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"48px"}
      >
        <Row>
          <Space num={3} />
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
