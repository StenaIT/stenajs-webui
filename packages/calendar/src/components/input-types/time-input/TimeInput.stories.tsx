import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import { TimeInput } from "./TimeInput";

export default {
  title: "calendar/Input/TimeInput",
  component: TimeInput,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Box width={"125px"}>
      <TimeInput value={value} onValueChange={setValue} />
    </Box>
  );
};
