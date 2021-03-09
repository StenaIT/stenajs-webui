import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import { DateTimeInput } from "./DateTimeInput";

export default {
  title: "calendar/Input/DateTimeInput",
  component: DateTimeInput,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Box width={"165px"}>
      <DateTimeInput value={value} onValueChange={setValue} />
    </Box>
  );
};
