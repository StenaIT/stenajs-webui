import { Row, Spacing, StandardText } from "@stenajs-webui/core";
import { ErrorScreen, LoadingScreen } from "@stenajs-webui/panels";
import * as React from "react";
import { StandardTableProps } from "./StandardTable";
import { StandardTableRowList } from "./StandardTableRowList";

interface Props<TItem> extends StandardTableProps<TItem> {}

export const StandardTableContent = React.memo(function StandardTableContent<
  TItem
>({
  error,
  errorLabel,
  loading,
  items,
  noItemsLabel = "There is no data available."
}: Props<TItem>) {
  if (error) {
    return (
      <Spacing num={10}>
        <ErrorScreen text={errorLabel || error.message} />
      </Spacing>
    );
  }

  if (loading) {
    return (
      <Spacing num={10}>
        <LoadingScreen />
      </Spacing>
    );
  }

  if (!items || !items.length) {
    return (
      <Row spacing={10} justifyContent={"center"}>
        <StandardText>{noItemsLabel}</StandardText>
      </Row>
    );
  }

  return <StandardTableRowList items={items} />;
});
