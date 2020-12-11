import * as React from "react";
import { Row, Spacing, Text } from "@stenajs-webui/core";
import { ErrorScreen, LoadingScreen } from "@stenajs-webui/panels";
import { StandardTableProps, StandardTableVariant } from "./StandardTable";
import { StandardTableRowList } from "./StandardTableRowList";

interface Props<TItem, TColumnKey extends string>
  extends Omit<
    StandardTableProps<TItem, TColumnKey>,
    "tableContext" | "config"
  > {
  variant: StandardTableVariant;
}

export const StandardTableContent = React.memo(function StandardTableContent<
  TItem,
  TColumnKey extends string
>({
  error,
  errorLabel,
  loading,
  items,
  noItemsLabel = "There is no data available.",
  colIndexOffset,
  rowIndexOffset,
  variant,
}: Props<TItem, TColumnKey>) {
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
        <Text>{noItemsLabel}</Text>
      </Row>
    );
  }

  return (
    <StandardTableRowList
      variant={variant}
      items={items}
      colIndexOffset={colIndexOffset}
      rowIndexOffset={rowIndexOffset}
    />
  );
});
