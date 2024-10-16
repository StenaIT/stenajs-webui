import * as React from "react";
import { FloatingTree, useFloatingParentNodeId } from "@floating-ui/react";
import { PropsWithChildren } from "react";

export interface FloatingTreeFallbackProps extends PropsWithChildren {}

export const FloatingTreeFallback: React.FC<FloatingTreeFallbackProps> = ({
  children,
}) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return <FloatingTree>{children}</FloatingTree>;
  }

  return children;
};
