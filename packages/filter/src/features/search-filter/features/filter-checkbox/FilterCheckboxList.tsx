import * as React from "react";
import { PropsWithChildren } from "react";
import { Column } from "@stenajs-webui/core";

export interface FilterCheckboxListProps extends PropsWithChildren {
  maxHeight?: string;
}

export const FilterCheckboxList: React.FC<FilterCheckboxListProps> = ({
  children,
  maxHeight,
}) => {
  return (
    <Column
      maxHeight={maxHeight}
      overflowY={maxHeight ? "auto" : undefined}
      spacing={1}
    >
      {children}
    </Column>
  );
};
