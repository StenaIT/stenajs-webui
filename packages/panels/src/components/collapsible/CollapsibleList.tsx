import * as React from "react";
import { Column } from "@stenajs-webui/core";
import { ReactNode } from "react";

export interface CollapsibleListProps {
  children?: ReactNode;
}

export const CollapsibleList: React.FC<CollapsibleListProps> = ({
  children,
}) => {
  return <Column gap={1}>{children}</Column>;
};
