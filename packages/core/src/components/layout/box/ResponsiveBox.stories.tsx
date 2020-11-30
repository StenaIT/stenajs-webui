import * as React from "react";
import { Spacing } from "../spacing/Spacing";
import { Row } from "../row/Row";
import { Box } from "./Box";
import { Text } from "../../text/Text";

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
