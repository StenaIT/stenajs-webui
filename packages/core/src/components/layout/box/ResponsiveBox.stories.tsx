import { Box, Row, Spacing, StandardText } from "@stenajs-webui/core";
import * as React from "react";

export const createIndexArray = (length: number) =>
  Array.from(Array(length).keys());

const items = createIndexArray(30);

export default {
  title: "core/Responsive/Box",
  excludeStories: ["createIndexArray"]
};

export const Standard = () => (
  <>
    <Spacing>
      <StandardText>
        Change view port width to see width of items change.
      </StandardText>
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
            <StandardText>hello</StandardText>
            <StandardText>world</StandardText>
          </Box>
        </Box>
      ))}
    </Row>
  </>
);

Standard.storyName = "standard";
