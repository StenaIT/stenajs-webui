import { ListItem, mockedItems } from "./StandardTableStoryHelper";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { StandardTable } from "../components/StandardTable";
import * as React from "react";
import { createColumnConfig } from "../config/StandardTableColumnConfig";
import { Spacing } from "@stenajs-webui/core";
import { Banner } from "@stenajs-webui/elements";

export default {
  title: "grid/StandardTable/FewColumns",
};

export const FixedWidthColumns = () => {
  const config: StandardTableConfig<ListItem, "id" | "name"> = {
    keyResolver: (item) => item.id,
    showHeaderCheckbox: true,
    showRowCheckbox: true,
    enableGridCell: true,
    columns: {
      id: createColumnConfig((item) => item.id, {
        sortOrderIconVariant: "numeric",
        width: "100px",
      }),
      name: createColumnConfig((item) => item.name, {
        justifyContentHeader: "flex-end",
        justifyContentCell: "flex-end",
        infoIconTooltipText: "Ohoh",
        sortOrderIconVariant: "alpha",
        width: "100px",
      }),
    },
    columnOrder: ["id", "name"],
  };

  return (
    <div>
      <StandardTable items={mockedItems} config={config} />
      <Spacing />
      <Banner
        headerText={"Two columns with width=100px"}
        text={
          "They should be 100px wide and align to the left in the table. The table should still fill out the fill width of the browser, with row border all the way to the right. "
        }
      />
    </div>
  );
};

export const MinWidthColumns = () => {
  const config: StandardTableConfig<ListItem, "id" | "name"> = {
    keyResolver: (item) => item.id,
    showHeaderCheckbox: true,
    showRowCheckbox: true,
    enableGridCell: true,
    columns: {
      id: createColumnConfig((item) => item.id, {
        sortOrderIconVariant: "numeric",
        minWidth: "500px",
      }),
      name: createColumnConfig((item) => item.name, {
        justifyContentHeader: "flex-end",
        justifyContentCell: "flex-end",
        infoIconTooltipText: "Ohoh",
        sortOrderIconVariant: "alpha",
        minWidth: "500px",
      }),
    },
    columnOrder: ["id", "name"],
  };

  return (
    <div style={{ overflow: "scroll" }}>
      <StandardTable items={mockedItems} config={config} />
      <Spacing />
      <Banner
        headerText={"Two columns with minWidth=500px"}
        text={
          "Reduce browser width to verify that they don't get less wide than 500px."
        }
      />
    </div>
  );
};
