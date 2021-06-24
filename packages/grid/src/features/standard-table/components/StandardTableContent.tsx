import { Row, Spacing } from "@stenajs-webui/core";
import { Banner } from "@stenajs-webui/elements";
import { ErrorScreen, LoadingScreen } from "@stenajs-webui/panels";
import * as React from "react";
import { useTotalNumColumns } from "../context/TotalNumColumnsContext";
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
  const totalNumColumns = useTotalNumColumns();

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4}>
              <ErrorScreen text={errorLabel || error.message} />
            </Spacing>
          </td>
        </tr>
      </tbody>
    );
  }

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4}>
              <LoadingScreen />
            </Spacing>
          </td>
        </tr>
      </tbody>
    );
  }

  if (!items || !items.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Row spacing={4} justifyContent={"center"}>
              <Banner
                text={noItemsLabel}
                headerText={noItemsHeader}
                contentRight={noItemsContentRight}
                variant={"info"}
              >
                {noItemsContentBottom}
              </Banner>
            </Row>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      <StandardTableRowList
        variant={variant}
        items={items}
        colIndexOffset={colIndexOffset}
        rowIndexOffset={rowIndexOffset}
      />
    </tbody>
  );
});
