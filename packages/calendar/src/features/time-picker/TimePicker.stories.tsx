import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import { TimePicker } from "./TimePicker";

export default {
  title: "calendar/Pickers/TimePicker",
  component: TimePicker,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>("14:35");

  return (
    <Box height={"200px"}>
      <TimePicker value={value} onValueChange={setValue} />
    </Box>
  );
};
