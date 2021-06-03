import * as React from "react";
import { Heading, HeadingProps } from "./Heading";
import { Story } from "@storybook/react";

export default {
  title: "core/Text/Heading",
  component: Heading,
};

export const Overview: Story<HeadingProps> = (props) => (
  <Heading {...props}>The five boxing wizards jump quickly.</Heading>
);

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
