import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ErrorScreen } from "./ErrorScreen";
import { Link, SecondaryButton, stenaArrowLeft } from "@stenajs-webui/elements";

export default {
  title: "panels/Error/ErrorScreen",
  component: ErrorScreen,
};

export const Standard = () => (
  <Box height={"700px"}>
    <ErrorScreen
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
    </ErrorScreen>
  </Box>
);
