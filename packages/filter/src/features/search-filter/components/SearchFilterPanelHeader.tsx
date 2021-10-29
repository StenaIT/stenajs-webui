import * as React from "react";
import { Heading, Indent, Row } from "@stenajs-webui/core";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";
import { cssColor } from "@stenajs-webui/theme";

interface SearchFilterPanelHeaderProps {
  onRequestClose: () => void;
}

export const SearchFilterPanelHeader: React.FC<SearchFilterPanelHeaderProps> = ({
  onRequestClose,
}) => {
  return (
    <Row
      height={"48px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      indent={2}
    >
      <Row alignItems={"center"}>
        <Icon
          icon={faSlidersH}
          color={cssColor("--lhds-color-ui-500")}
          size={12}
        />
        <Indent />
        <Heading variant={"h4"}>Filters</Heading>
      </Row>
      <FlatButton leftIcon={faTimes} onClick={onRequestClose} />
    </Row>
  );
};
