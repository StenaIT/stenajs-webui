import { Row, Spacing } from "@stenajs-webui/core";
import { Banner } from "@stenajs-webui/elements";
import { ErrorScreen, LoadingScreen } from "@stenajs-webui/panels";
import * as React from "react";
import { StandardTableProps, StandardTableVariant } from "./StandardTable";
import { StandardTableRowList } from "./StandardTableRowList";

interface Props<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
> extends Omit<
    StandardTableProps<TItem, TColumnKey, TColumnGroupKey>,
    "tableContext" | "config"
  > {
  variant: StandardTableVariant;
}

export const StandardTableContent = React.memo(function StandardTableContent<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  error,
  errorLabel,
  loading,
  items,
  noItemsLabel = "There is no data available.",
  noItemsContentRight,
  noItemsContentBottom,
  noItemsHeader,
  colIndexOffset,
  rowIndexOffset,
  variant,
}: Props<TItem, TColumnKey, TColumnGroupKey>) {
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
      <Row spacing={2} justifyContent={"center"}>
        <Banner
          text={noItemsLabel}
          headerText={noItemsHeader}
          contentRight={noItemsContentRight}
          variant={"info"}
        >
          {noItemsContentBottom}
        </Banner>
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
