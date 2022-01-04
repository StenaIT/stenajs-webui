import * as React from "react";
import markdown from "./Box.md";
import { Box, BoxProps } from "./Box";
import { Text } from "../../text/Text";
import { Story } from "@storybook/react";
import {
  colorListControl,
  shadowListControl,
  spaceControl,
} from "../../../storybook-helpers/storybook-controls";
import { cssColor } from "@stenajs-webui/theme";
import { Space } from "../space/Space";

export default {
  title: "core/Layout/Box",
  component: Box,
  parameters: { notes: { markdown } },
  argTypes: {
    color: colorListControl,
    background: colorListControl,
    shadow: shadowListControl,
    indent: spaceControl,
    spacing: spaceControl,
  },
};

export const Overview: Story<BoxProps> = (props) => (
  <Box {...props}>
    <Text>hello</Text>
    <Text>world</Text>
  </Box>
);

export const Row = () => (
  <Box row>
    <Box width={"25px"} height={"25px"} background={"#8e7e7e"}/>
    <Box width={"25px"} height={"25px"} background={"#3e7e7e"}/>
  </Box>
);

export const RowWithJustifyContent = () => (
  <Box
    row
    justifyContent={"flex-end"}
    width={"500px"}
    border={"1px solid grey"}
  >
    <Box width={"25px"} height={"25px"} background={"#8e7e7e"}/>
    <Box width={"25px"} height={"25px"} background={"#3e7e7e"}/>
  </Box>
);

export const WithDomAttributes = () => (
  <Box id={"id123"} className={"aNiceClass"}>
    I have id and class.
  </Box>
);

export const Background = () => (
  <Box background={"red"} indent spacing>
    <div>hello</div>
    <div>world</div>
  </Box>
);

export const CustomBackground = () => (
  <Box background={"#e66465"} indent spacing>
    <div>hello</div>
    <div>world</div>
  </Box>
);

export const GradientBackground = () => (
  <Box
    background={`linear-gradient(to right, "#e66465", #9198e5)`}
    indent
    spacing
  >
    <div>hello</div>
    <div>world</div>
  </Box>
);

export const IndentAndSpacing = () => (
  <Box background={"#DFCD59"} indent={4} spacing={4}>
    <div>hello</div>
    <div>world</div>
  </Box>
);

export const Border = () => (
  <div style={{ display: "inline-block" }}>
    <Box
      borderWidth={1}
      borderColor={"blue"}
      borderStyle={"solid"}
      indent
      spacing
    >
      <div>hello</div>
      <div>world</div>
    </Box>
  </div>
);

export const CustomBorder = () => (
  <div style={{ display: "inline-block" }}>
    <Box border={"1px solid #676767"} indent spacing>
      <div>hello</div>
      <div>world</div>
    </Box>
  </div>
);

export const BoxShadow = () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"box"} indent spacing>
      <Text>This shadow is primarily used for cards, not modals.</Text>
    </Box>
  </div>
);

export const ModalShadow = () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"modal"} indent spacing>
      <Text>This shadow is primarily used for modals.</Text>
    </Box>
  </div>
);

export const CustomShadow = () => (
  <Box shadow={`red 0px 0px 10px 4px`} indent spacing>
    <div>hello</div>
    <div>world</div>
  </Box>
);

export const FlexGrowChildren = () => (
  <Box row width={"500px"}>
    <Box background={"#DFCD59"} indent spacing>
      no flex
    </Box>
    <Box background={"#D9419C"} flex={1} indent spacing>
      flex 1
    </Box>
    <Box background={"#219CA6"} flex={2} indent spacing>
      flex 2
    </Box>
    <Box background={"#23858C"} indent spacing>
      no flex
    </Box>
  </Box>
);

export const WithAriaLabel = () => (
  <>
    <Text>This blue box has an aria label.</Text>
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

export const Gap = () => (
  <>
    <Box gap={2} row background={cssColor("--lhds-color-orange-200")}
         display={"inline-flex"}>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
    </Box>
    <Space />
    <Box gap={2} background={cssColor("--lhds-color-orange-200")}
         display={"inline-flex"}>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
      <Box width={"50px"} height={"50px"}
           background={cssColor("--lhds-color-orange-400")}/>
    </Box>
  </>
);
