import { FlatButton } from "@stenajs-webui/elements";
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
    config={standardTableConfigForStories}
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
