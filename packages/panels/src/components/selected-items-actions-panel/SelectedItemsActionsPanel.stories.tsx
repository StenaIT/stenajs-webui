import { Column, Heading, Indent, Row, Text } from "@stenajs-webui/core";
import {
  Card,
  CardBody,
  FlatButton,
  SecondaryButton,
  stenaClearRow,
  stenaPen,
  stenaTrash,
  Tag,
} from "@stenajs-webui/elements";
import * as React from "react";
import { SelectedItemsActionsPanel } from "./SelectedItemsActionsPanel";
import { SelectedItemsActionsPadding } from "./SelectedItemsActionsPadding";
import {
  ListItem,
  mockedItems,
  StandardTable,
  StandardTableConfig,
  standardTableConfigForStories,
  useListState,
} from "@stenajs-webui/grid";

export default {
  title: "panels/SelectedItemsActionsPanel",
  component: SelectedItemsActionsPanel,
};

export const Demo = () => {
  return (
    <SelectedItemsActionsPanel
      numItemsSelected={3}
      afterLabelContent={
        <>
          <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
          <FlatButton label={"Delete"} leftIcon={stenaTrash} />
          <FlatButton label={"Edit"} leftIcon={stenaPen} />
        </>
      }
      rightContent={
        <>
          <SecondaryButton label={"Download"} />
          <SecondaryButton label={"Export"} />
        </>
      }
    />
  );
};

export const WithStandardTable = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    checkboxDisabledResolver: (item) => item.id === "125",
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return (
    <Column>
      <Card zIndex={100}>
        <CardBody>
          <Heading>7 / 49 invoices</Heading>
        </CardBody>
        <SelectedItemsActionsPadding>
          <SelectedItemsActionsPanel
            numItemsSelected={3}
            afterLabelContent={
              <>
                <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
                <FlatButton label={"Delete"} leftIcon={stenaTrash} />
                <FlatButton label={"Edit"} leftIcon={stenaPen} />
              </>
            }
            rightContent={
              <>
                <SecondaryButton label={"Download"} />
                <SecondaryButton label={"Export"} />
              </>
            }
          />
        </SelectedItemsActionsPadding>
      </Card>
      <StandardTable config={config} items={items} />
    </Column>
  );
};

export const Empty = () => {
  return <SelectedItemsActionsPanel numItemsSelected={3} />;
};

export const CustomLabel = () => {
  return (
    <SelectedItemsActionsPanel
      label={"Great selection, man!"}
      afterLabelContent={
        <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
      }
      rightContent={
        <>
          <SecondaryButton label={"Download"} />
          <SecondaryButton label={"Export"} />
        </>
      }
    />
  );
};

export const CustomLabelContent = () => {
  return (
    <SelectedItemsActionsPanel
      label={
        <Row alignItems={"center"}>
          <Text>Status</Text>
          <Indent />
          <Tag label={"Active"} />
        </Row>
      }
      afterLabelContent={
        <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
      }
      rightContent={
        <>
          <SecondaryButton label={"Download"} />
          <SecondaryButton label={"Export"} />
        </>
      }
    />
  );
};
