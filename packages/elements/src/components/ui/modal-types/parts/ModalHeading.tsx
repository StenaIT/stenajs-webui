import * as React from "react";
import { Heading } from "@stenajs-webui/core";

export interface ModalHeadingProps {
  children: string;
}

export const ModalHeading: React.FC<ModalHeadingProps> = ({ children }) => {
  return (
    <Heading variant={"h3"} as={"h2"}>
      {children}
    </Heading>
  );
};
