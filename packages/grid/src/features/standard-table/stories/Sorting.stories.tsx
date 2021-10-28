import * as React from "react";
import { StandardTable } from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable/Sorting",
};

export const SortingDisabled = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    disableSorting: true,
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const SortingDisabledAndSortByName = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    disableSorting: true,
    initialSortOrder: "name",
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const SortingEnabledAndSortByNameDesc = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    initialSortOrder: "name",
    initialSortOrderDesc: true,
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};
