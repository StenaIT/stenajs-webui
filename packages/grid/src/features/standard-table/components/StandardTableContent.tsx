import { Box, Row, Spacing } from "@stenajs-webui/core";
import {
  Banner,
  ResultListBanner,
  ResultListBannerState,
} from "@stenajs-webui/elements";
import { LoadingScreen } from "@stenajs-webui/panels";
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

export const createErrorBanner = (message: string): ResultListBannerState => {
  return {
    headerText: message,
  };
};

export const StandardTableContent = React.memo(function StandardTableContent<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  error,
  errorBanner,
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

  if (errorBanner) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4} justifyContent={"center"}>
              <Box alignItems={"center"}>
                <ResultListBanner bannerState={errorBanner} variant={"error"} />
              </Box>
            </Spacing>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={totalNumColumns}>
            <Spacing num={4} justifyContent={"center"}>
              <Box alignItems={"center"}>
                <ResultListBanner
                  bannerState={
                    error.message
                      ? createErrorBanner(error.message)
                      : createErrorBanner(errorLabel ?? "")
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
