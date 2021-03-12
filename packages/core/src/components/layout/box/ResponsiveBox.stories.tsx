import * as React from "react";
import { Spacing } from "../spacing/Spacing";
import { Row } from "../row/Row";
import { Box } from "./Box";
import { Text } from "../../text/Text";
import { cssColor } from "@stenajs-webui/theme";

export const createIndexArray = (length: number) =>
  Array.from(Array(length).keys());

const items = createIndexArray(30);

export default {
  title: "core/Responsive/Box",
  excludeStories: ["createIndexArray"],
};

export const Standard = () => (
  <>
    <Spacing>
      <Text>Change view port width to see width of items change.</Text>
    </Spacing>
    <Row flexWrap={"wrap"}>
      {items.map((_, index) => (
        <Box key={index} width={[1, 1 / 2, 1 / 8]} spacing indent>
          <Box
            borderColor={"#777"}
            borderWidth={"1px"}
            borderStyle={"solid"}
            spacing
            indent
          >
            <Text>hello</Text>
            <Text>world</Text>
          </Box>
        </Box>
      ))}
    </Row>
  </>
);

export const IndentSpacing = () => (
  <>
    <Spacing>
      <Text>Change view port width to see width of items change.</Text>
    </Spacing>
    <Row flexWrap={"wrap"}>
      {items.map((_, index) => (
        <Box key={index} width={1} spacing={[0, 1, 2, 3]} indent={[0, 1, 2, 3]}>
          <Box
            borderColor={"#777"}
            borderWidth={"1px"}
            borderStyle={"solid"}
            spacing
            indent
          >
            <Text>hello</Text>
            <Text>world</Text>
          </Box>
        </Box>
      ))}
    </Row>
  </>
);

export const OtherProps = () => (
  <>
    <Spacing>
      <Text>Change view port width to see the background change.</Text>
    </Spacing>
    <Row flexWrap={"wrap"}>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        width={200}
        height={200}
        background={[
          cssColor("--lhds-color-blue-200"),
          cssColor("--lhds-color-red-200"),
        ]}
      >
        <Text>hello</Text>
      </Box>
    </Row>
  </>
);
