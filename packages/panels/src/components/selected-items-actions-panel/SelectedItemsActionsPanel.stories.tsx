import * as React from "react";
import { SelectedItemsActionsPanel } from "./SelectedItemsActionsPanel";
import { Indent, Row, Space, Text } from "@stenajs-webui/core";
import { FlatButton, SecondaryButton, Tag } from "@stenajs-webui/elements";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons/faMinusSquare";

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
        <FlatButton label={"Clear all"} leftIcon={faMinusSquare} />
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
        <FlatButton label={"Clear all"} leftIcon={faMinusSquare} />
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
        <FlatButton label={"Clear all"} leftIcon={faMinusSquare} />
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
