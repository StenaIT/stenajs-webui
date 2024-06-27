import { Box, Row, Spacing } from "@stenajs-webui/core";
import { Banner, ResultListBanner } from "@stenajs-webui/elements";
import { LoadingScreen } from "@stenajs-webui/panels";
import * as React from "react";
import { useTotalNumColumns } from "../context/TotalNumColumnsContext";
import { StandardTableProps, StandardTableVariant } from "./StandardTable";
import { StandardTableRowList } from "./StandardTableRowList";

interface Props<
  TItem extends object,
  TColumnKey extends string,
  TColumnGroupKey extends string
> extends Omit<
    StandardTableProps<TItem, TColumnKey, TColumnGroupKey>,
    "tableContext" | "config"
  > {
  variant: StandardTableVariant;
}

export const StandardTableContent = React.memo(function StandardTableContent<
  TItem extends object,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  error,
  bannerError,
  loading,
  items,
  noItemsLabel = "There is no data available.",
  noItemsContentRight,
  noItemsContentBottom,
  noItemsHeader,
  colIndexOffset,
  rowIndexOffset,
  variant,
  errorLabel,
}: Props<TItem, TColumnKey, TColumnGroupKey>) {
  const totalNumColumns = useTotalNumColumns();

  if (bannerError) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4} justifyContent={"center"}>
              <Box alignItems={"center"}>
                <ResultListBanner bannerState={bannerError} variant={"error"} />
              </Box>
            </Spacing>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error || errorLabel) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4} justifyContent={"center"}>
              <Box alignItems={"center"}>
                <Banner
                  headerText={
                    (error ? error.message : errorLabel) ?? "Unknown error"
                  }
                  variant={"error"}
                />
              </Box>
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
