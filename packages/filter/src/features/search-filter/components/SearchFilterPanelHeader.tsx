import * as React from "react";
import { Heading, Indent, Row } from "@stenajs-webui/core";
import { Icon, SecondaryButton } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";
import { cssColor } from "@stenajs-webui/theme";

interface SearchFilterPanelHeaderProps {
  onRequestClose: () => void;
  header?: string;
}

export const SearchFilterPanelHeader: React.FC<SearchFilterPanelHeaderProps> = ({
  onRequestClose,
  header = "Filters",
}) => {
  return (
    <Row
      height={"56px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      indent={2}
    >
      <Row alignItems={"center"}>
        <Icon
          icon={faSlidersH}
          color={cssColor("--lhds-color-ui-800")}
          size={24}
        />
        <Indent />
        <Heading variant={"h4"}>{header}</Heading>
      </Row>
      <SecondaryButton leftIcon={faTimes} onClick={onRequestClose} />
    </Row>
  );
};
