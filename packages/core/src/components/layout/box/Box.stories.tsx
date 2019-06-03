import { color, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { defaultTheme } from "../../../theme/DefaultTheme";

import { Box } from "./Box";
import markdown from "./Box.md";

storiesOf("core/Layout/Box", module)
  .add(
    "standard",
    () => (
      <Box>
        <div>hello</div>
        <div>world</div>
      </Box>
    ),
    { notes: { markdown } }
  )
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
  .add("with DOM attributes", () => (
    <Box id={"id123"} className={"aNiceClass"}>
      I have id and class.
    </Box>
  ))
  .add("background", () => (
    <Box
      background={select(
        "Color",
        Object.keys(defaultTheme.colors),
        "primaryBg"
      )}
      indent
      spacing
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("custom background", () => (
    <Box background={color("Color", "#e66465")} indent spacing>
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("gradient background", () => (
    <Box
      background={`linear-gradient(to right, ${color(
        "Color 1",
        "#e66465"
      )}, ${color("Color 2", "#9198e5")})`}
      indent
      spacing
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  ))
  .add("indent and spacing", () => (
    <Box
      background={"#DFCD59"}
      indent={number("Indent", 1, { range: true, min: 0, max: 10, step: 1 })}
      spacing={number("Absolute", 1, { range: true, min: 0, max: 10, step: 1 })}
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
  .add("custom shadow", () => (
    <Box
      shadow={`${color("Shadow color", "red")} 0px 0px 10px 4px;`}
      indent
      spacing
    >
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
