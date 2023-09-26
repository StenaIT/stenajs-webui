import * as React from "react";
import { Heading, HeadingProps, HeadingVariant } from "./Heading";
import { Story } from "@storybook/react";
import { Column } from "../layout/column/Column";

export default {
  title: "core/Text/Heading",
  component: Heading,
};

export const Overview: Story<HeadingProps> = () => {
  const headings: Array<HeadingVariant> = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return (
    <Column gap={4}>
      {headings.map((variant) => (
        <Heading variant={variant}>
          {variant} The five boxing wizards jump quickly.
        </Heading>
      ))}
    </Column>
  );
};

export const H1 = () => (
  <Heading variant={"h1"}>The five boxing wizards jump quickly.</Heading>
);

export const H2 = () => (
  <Heading variant={"h2"}>The five boxing wizards jump quickly.</Heading>
);

export const H3 = () => (
  <Heading variant={"h3"}>The five boxing wizards jump quickly.</Heading>
);

export const H4 = () => (
  <Heading variant={"h4"}>The five boxing wizards jump quickly.</Heading>
);

export const H5 = () => (
  <Heading variant={"h5"}>The five boxing wizards jump quickly.</Heading>
);

export const H6 = () => (
  <Heading variant={"h6"}>The five boxing wizards jump quickly.</Heading>
);

export const H3asH1 = () => (
  <Heading variant={"h3"} as={"h1"}>
    The five boxing wizards jump quickly.
  </Heading>
);
