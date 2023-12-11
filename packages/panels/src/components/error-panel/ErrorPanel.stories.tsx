import { ErrorPanel } from "./ErrorPanel";
import * as React from "react";
import { Link, SecondaryButton, stenaArrowLeft } from "@stenajs-webui/elements";
import { Box, Text } from "@stenajs-webui/core";

export default {
  title: "panels/Error/ErrorPanel",
  component: ErrorPanel,
};

export const Standard = () => (
  <Box width={"500px"} spacing={3} indent={3}>
    <ErrorPanel
      heading={"Something went wrong"}
      text={
        "You can go back and try again in a few minutes. If it still doesn't work, contact us for help."
      }
    />
  </Box>
);

export const WithChildren = () => (
  <Box width={"500px"} spacing={3} indent={3}>
    <ErrorPanel heading={"Something went wrong"}>
      <Text>
        You can go back and try again in a few minutes. If it still doesn't
        work, <Link>contact us</Link> for help.
      </Text>
    </ErrorPanel>
  </Box>
);

export const WithButtons = () => (
  <Box width={"500px"} spacing={3} indent={3}>
    <ErrorPanel
      heading={"Something went wrong"}
      buttons={
        <SecondaryButton
          label={"Go back"}
          leftIcon={stenaArrowLeft}
          size={"large"}
        />
      }
    >
      <Text>
        You can go back and try again in a few minutes. If it still doesn't
        work, <Link>contact us</Link> for help.
      </Text>
    </ErrorPanel>
  </Box>
);
