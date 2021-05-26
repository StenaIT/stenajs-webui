import * as React from "react";
import { StandardTable } from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { createEditableTextCellWithStatus } from "../helpers/cell-renderers/editable-text-cell/EditableTextCellWithStatus";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable/Fields",
};

export const FieldError = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(undefined, (item) => ({
          hasError: true,
          errorMessage: "Something failed.",
          id: item.id,
        })),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const FieldLoading = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(undefined, (item) => ({
          id: item.id,
          loading: true,
        })),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const ModifiedFields = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(
          "Passengers cannot be empty",
          () => undefined,
          (item) => ({
            id: item.id,
            modified: true,
            newValue: "789",
          })
        ),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const WarningWhenModifiedFieldIsEmpty = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(
          "Passengers cannot be empty",
          () => undefined,
          (item) => ({
            id: item.id,
            modified: true,
            newValue: "",
          })
        ),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};
