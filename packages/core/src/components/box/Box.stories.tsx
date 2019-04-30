import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Box } from "./Box";

storiesOf("core/Box/Box", module)
  .add("standard", () => (
    <Box>
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("row", () => (
    <Box row>
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("row with justifyContent", () => (
    <Box
      row
      justifyContent={"flex-end"}
      width={"500px"}
      border={"1px solid grey"}
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("background", () => (
    <Box
      background={"linear-gradient(to right, #e66465, #9198e5)"}
      indent={number("Indent", 1)}
      spacing={number("Spacing", 1)}
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("box shadow", () => (
    <Box shadow={"box"} indent spacing>
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("modal shadow", () => (
    <Box shadow={"modal"} indent spacing>
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("flex grow children", () => (
    <Box row width={"500px"}>
      <Box background="#DFCD59" indent spacing>
        no flex
      </Box>
      <Box background="#D9419C" flex={1} indent spacing>
        flex 1
      </Box>
      <Box background="#219CA6" flex={2} indent spacing>
        flex 2
      </Box>
      <Box background="#23858C" indent spacing>
        no flex
      </Box>
    </Box>
  ));
