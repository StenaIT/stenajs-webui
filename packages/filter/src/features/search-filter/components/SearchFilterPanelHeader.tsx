import * as React from "react";
import { ReactNode } from "react";
import {
  CardHeader,
  FlatButton,
  stenaSliders,
  stenaTimes,
} from "@stenajs-webui/elements";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Row } from "@stenajs-webui/core";

interface SearchFilterPanelHeaderProps {
  onRequestClose: () => void;
  header?: string;
  headerIcon?: IconDefinition;
  contentRight?: ReactNode;
}

export const SearchFilterPanelHeader: React.FC<
  SearchFilterPanelHeaderProps
> = ({
  onRequestClose,
  header = "Filters",
  headerIcon = stenaSliders,
  contentRight,
}) => {
  return (
    <CardHeader
      flex={"0 0 auto"}
      contentRight={
        <Row gap={2}>
          {contentRight}
          <FlatButton leftIcon={stenaTimes} onClick={onRequestClose} />
        </Row>
      }
      leftIcon={headerIcon}
      text={header}
    />
  );
};
