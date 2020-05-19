import { Box, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { useStandardTableContext } from "../hooks/UseStandardTableContext";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeader } from "./StandardTableHeader";

export interface StandardTableProps<TItem> {
  items?: Array<TItem>;
  error?: Error;
  loading?: boolean;
  noItemsLabel?: string;
  errorLabel?: string;
}

export const StandardTable = function StandardTable<TItem>(
  props: StandardTableProps<TItem>
) {
  const context = useStandardTableContext();

  if (!context) {
    return (
      <Box spacing indent background={"var(--swui-state-error-color)"}>
        <StandardText color={"var(--swui-white)"}>
          Missing standard table context.
        </StandardText>
      </Box>
    );
  }

  return (
    <Box>
      <StandardTableHeader items={props.items} />
      <StandardTableContent {...props} />
    </Box>
  );
};
