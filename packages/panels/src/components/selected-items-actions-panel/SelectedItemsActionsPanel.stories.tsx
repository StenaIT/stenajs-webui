import { Indent, Row, Space, Text } from "@stenajs-webui/core";
import {
  FlatButton,
  SecondaryButton,
  stenaClearRow,
  Tag,
} from "@stenajs-webui/elements";
import * as React from "react";
import { SelectedItemsActionsPanel } from "./SelectedItemsActionsPanel";

export default {
  title: "panels/SelectedItemsActionsPanel",
  component: SelectedItemsActionsPanel,
};

export const Demo = () => {
  return <SelectedItemsActionsPanel numItemsSelected={3} />;
};

export const WithButtons = () => {
  return (
    <SelectedItemsActionsPanel
      numItemsSelected={3}
      afterLabelContent={
        <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
      }
      rightContent={
        <Row>
          <SecondaryButton label={"Download"} />
          <Space />
          <SecondaryButton label={"Export"} />
        </Row>
      }
    />
  );
};

export const CustomLabel = () => {
  return (
    <SelectedItemsActionsPanel
      label={"Great selection, man!"}
      afterLabelContent={
        <FlatButton label={"Clear all"} leftIcon={stenaClearRow} />
      }
      rightContent={
        <Row>
          <SecondaryButton label={"Download"} />
          <Space />
          <SecondaryButton label={"Export"} />
        </Row>
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
        <Row>
          <SecondaryButton label={"Download"} />
          <Space />
          <SecondaryButton label={"Export"} />
        </Row>
      }
    />
  );
};
