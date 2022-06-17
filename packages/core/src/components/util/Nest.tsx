import * as React from "react";
import { ReactNode } from "react";

interface Props {
  nest?: boolean;
  render: (children: ReactNode) => ReactNode;
  children?: ReactNode;
}

export const Nest: React.FC<Props> = ({ children, nest, render }) => {
  if (nest) {
    return <>{render(children)}</>;
  }
  return <>{children}</>;
};
