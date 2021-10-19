import { FlatButton, ResultListBannerState } from "@stenajs-webui/elements";
import * as React from "react";
import { StandardTable } from "../components/StandardTable";
import {
  mockedItems,
  standardTableConfigForStories,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable/States",
};

export const MissingItems = () => (
  <StandardTable items={[]} config={standardTableConfigForStories} />
);

export const MissingItemsCustomBanner = () => (
  <StandardTable
    items={[]}
    config={standardTableConfigForStories}
    noItemsHeader={"There are no users."}
    noItemsLabel={"Change filter settings to widen the search."}
    noItemsContentRight={<FlatButton label={"Open filter"} />}
  />
);

export const Loading = () => (
  <StandardTable
    items={mockedItems}
    config={{ ...standardTableConfigForStories, rowIndent: 2 }}
    loading
  />
);

export const _Error = () => (
  <StandardTable
    items={mockedItems}
    config={standardTableConfigForStories}
    error={new Error("Could not fetch users")}
  />
);

export const BannerError = () => {
  const bannerState: ResultListBannerState = {
    headerText: "Default banner header error text",
    text: "Default banner error text",
    items: [
      { text: "First Error" },
      { text: "Second Error" },
      { text: "Third Error" },
    ],
  };

  return (
    <StandardTable
      items={mockedItems}
      config={standardTableConfigForStories}
      errorBanner={bannerState}
    />
  );
};
