import * as React from "react";
import { ReactNode } from "react";
import { DrawerHeader } from "@stenajs-webui/modal";

interface SearchFilterPanelHeaderProps {
  onRequestClose: () => void;
  header?: string;
  contentRight?: ReactNode;
}

export const SearchFilterPanelHeader: React.FC<
  SearchFilterPanelHeaderProps
> = ({ header = "Filter", ...props }) => {
  return (
    <Spacing
      position={"sticky"}
      top={0}
      background={cssColor("--lhds-color-ui-50")}
      zIndex={100}
    >
      <DrawerHeader {...props} header={header} />
    </Spacing>
  );
};
