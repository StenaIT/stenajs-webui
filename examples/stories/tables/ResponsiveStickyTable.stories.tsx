import {
  Box,
  Column,
  Heading,
  Row,
  SeparatorLine,
  Spacing,
  Txt,
} from "@stenajs-webui/core";
import { StandardTable } from "@stenajs-webui/grid";
import { StandardTableConfig } from "@stenajs-webui/grid/src/features/standard-table/config/StandardTableConfig";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "@stenajs-webui/grid/src/features/standard-table/stories/StandardTableStoryHelper";
import { NavBar } from "@stenajs-webui/panels";
import * as React from "react";

export default {
  title: "examples/Tables/StickyViewAndTable",
  parameters: {
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    layout: "fullscreen",
    viewMode: "canvas",
    docs: {
      page: null,
    },
  },
};

export const StickyViewAndTable = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    enableGridCell: false,
    stickyHeader: true,
    rowIndent: false,
    headerRowOffsetTop: "154px",

    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "300px",
        sticky: true,
      },
      active: {
        ...standardTableConfigForStories.columns.active,
        minWidth: "500px",
      },
      name: {
        ...standardTableConfigForStories.columns.name,
        minWidth: "500px",
      },
      ship: {
        ...standardTableConfigForStories.columns.ship,
        minWidth: "500px",
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
        minWidth: "500px",
      },
      departure: {
        ...standardTableConfigForStories.columns.departure,
        minWidth: "500px",
      },
    },
    columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
  };

  // Calculate the view width without scroll, different sizes of scrollbars depending on operator systems.
  // To avoid this use a custom scrollbar with a set width and use calc(100vw - the width of the scrollbar).
  const getWidthWithoutScroll = () => {
    if (navigator.userAgent.includes("Windows")) {
      return "calc(100vw - 17px)";
    }
    if (navigator.userAgent.includes("Macintosh")) {
      return "calc(100vw - 15px)";
    }
    return "100vw";
  };

  return (
    <>
      <Box display={"table"} background={"#fff"}>
        <Row
          zIndex={1}
          background={"var(--lhds-color-blue-800)"}
          top={0}
          position={"sticky"}
        >
          <Column left={0} position={"sticky"} width={getWidthWithoutScroll()}>
            <NavBar
              variant={"dark"}
              showMenuButton
              left={
                <Txt size="large" color={"#ffffff"}>
                  Storybook
                </Txt>
              }
            />
          </Column>
        </Row>

        <Box
          background={"white"}
          top={64}
          position={"sticky"}
          zIndex={1}
          borderBottom={"1px solid var(--lhds-color-ui-300)"}
        >
          <Column
            zIndex={1}
            left={0}
            position={"sticky"}
            width={getWidthWithoutScroll()}
            indent
            spacing
          >
            <Heading variant={"h1"}>Table</Heading>
          </Column>

          <SeparatorLine color={"var(--lhds-color-ui-300)"} />
          <Box
            position={"sticky"}
            left={0}
            width={getWidthWithoutScroll()}
            indent
            spacing
          >
            <Heading variant={"h3"}>Example</Heading>
          </Box>
        </Box>
        <Spacing num={2} background={"#f2f3f5"} />
        <Box shadow={"box"} spacing background={"#fff"}>
          <StandardTable items={items} config={config} />
        </Box>
      </Box>
    </>
  );
};
