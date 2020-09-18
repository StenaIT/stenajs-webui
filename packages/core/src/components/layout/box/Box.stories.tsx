import { Box, defaultTheme, StandardText } from "@stenajs-webui/core";
import { color, number, select } from "@storybook/addon-knobs";
import * as CSS from "csstype";
import * as React from "react";
import markdown from "./Box.md";

export default {
  title: "core/Layout/Box"
};

export const Standard = () => (
  <Box
    width={`${number("width", 100, {
      range: true,
      min: 100,
      max: 500,
      step: 1
    })}px`}
    height={`${number("height", 100, {
      range: true,
      min: 100,
      max: 500,
      step: 1
    })}px`}
    background={select(
      "background",
      Object.keys(defaultTheme.colors),
      "primaryBg"
    )}
    color={select("color", Object.keys(defaultTheme.colors), "primaryText")}
    indent={number("indent", 1, { range: true, min: 0, max: 10, step: 1 })}
    spacing={number("spacing", 1, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    })}
    borderWidth={number("borderWidth", 1, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    })}
    borderColor={select(
      "borderColor",
      Object.keys(defaultTheme.colors),
      "primaryBg"
    )}
    borderStyle={select(
      "borderStyle",
      ["solid", "dashed", "dotted", "double", "groove", "ridge"],
      "solid"
    )}
    shadow={select("shadow", ["", "box", "modal"], "")}
    justifyContent={select(
      "justifyContent",
      ["flex-start", "center", "flex-end", "space-around", "space-between"],
      "flex-start"
    )}
    alignItems={select(
      "alignItems",
      ["flex-start", "center", "flex-end", "space-around", "space-between"],
      "flex-start"
    )}
    flexDirection={
      select(
        "flexDirection",
        ["column", "row"],
        "column"
      ) as CSS.FlexDirectionProperty
    }
  >
    <StandardText>hello</StandardText>
    <StandardText>world</StandardText>
  </Box>
);

Standard.story = {
  name: "standard",
  parameters: { notes: { markdown } }
};

export const Row = () => (
  <Box row>
    <Box width={"25px"} height={"25px"} background={"#8e7e7e"} />
    <Box width={"25px"} height={"25px"} background={"#3e7e7e"} />
  </Box>
);

Row.story = {
  name: "row"
};

export const RowWithJustifyContent = () => (
  <Box
    row
    justifyContent={"flex-end"}
    width={"500px"}
    border={"1px solid grey"}
  >
    <Box width={"25px"} height={"25px"} background={"#8e7e7e"} />
    <Box width={"25px"} height={"25px"} background={"#3e7e7e"} />
  </Box>
);

RowWithJustifyContent.story = {
  name: "row with justifyContent"
};

export const WithDomAttributes = () => (
  <Box id={"id123"} className={"aNiceClass"}>
    I have id and class.
  </Box>
);

WithDomAttributes.story = {
  name: "with DOM attributes"
};

export const Background = () => (
  <Box
    background={select(
      "background",
      Object.keys(defaultTheme.colors),
      "primaryBg"
    )}
    indent
    spacing
  >
    <div>hello</div>
    <div>world</div>
  </Box>
);

Background.story = {
  name: "background"
};

export const CustomBackground = () => (
  <Box background={color("background", "#e66465")} indent spacing>
    <div>hello</div>
    <div>world</div>
  </Box>
);

CustomBackground.story = {
  name: "custom background"
};

export const GradientBackground = () => (
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
);

GradientBackground.story = {
  name: "gradient background"
};

export const IndentAndSpacing = () => (
  <Box
    background={"#DFCD59"}
    indent={number("indent", 1, { range: true, min: 0, max: 10, step: 1 })}
    spacing={number("spacing", 1, { range: true, min: 0, max: 10, step: 1 })}
  >
    <div>hello</div>
    <div>world</div>
  </Box>
);

IndentAndSpacing.story = {
  name: "indent and spacing"
};

export const Border = () => (
  <div style={{ display: "inline-block" }}>
    <Box
      borderWidth={number("borderWidth", 1, {
        range: true,
        min: 0,
        max: 10,
        step: 1
      })}
      borderColor={select(
        "borderColor",
        Object.keys(defaultTheme.colors),
        "primaryBg"
      )}
      borderStyle={select(
        "borderStyle",
        ["solid", "dashed", "dotted", "double", "groove", "ridge"],
        "solid"
      )}
      indent
      spacing
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  </div>
);

Border.story = {
  name: "border"
};

export const CustomBorder = () => (
  <div style={{ display: "inline-block" }}>
    <Box border={"1px solid #676767"} indent spacing>
      <div>hello</div>
      <div>world</div>
    </Box>
  </div>
);

CustomBorder.story = {
  name: "custom border"
};

export const BoxShadow = () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"box"} indent spacing>
      <StandardText>
        This shadow is primarily used for cards, not modals.
      </StandardText>
    </Box>
  </div>
);

BoxShadow.story = {
  name: "box shadow"
};

export const ModalShadow = () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"modal"} indent spacing>
      <StandardText>This shadow is primarily used for modals.</StandardText>
    </Box>
  </div>
);

ModalShadow.story = {
  name: "modal shadow"
};

export const CustomShadow = () => (
  <Box
    shadow={`${color("Shadow color", "red")} 0px 0px 10px 4px;`}
    indent
    spacing
  >
    <div>hello</div>
    <div>world</div>
  </Box>
);

CustomShadow.story = {
  name: "custom shadow"
};

export const FlexGrowChildren = () => (
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
);

FlexGrowChildren.story = {
  name: "flex grow children"
};

export const WithAriaLabel = () => (
  <>
    <StandardText>This blue box has an aria label.</StandardText>
    <Box indent spacing>
      <Box
        aria-label={"This is a blue box."}
        tabIndex={0}
        width={"100px"}
        height={"100px"}
        background={"blue"}
      />
    </Box>
  </>
);

WithAriaLabel.story = {
  name: "with aria label"
};
