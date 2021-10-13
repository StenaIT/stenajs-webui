import { Column } from "@stenajs-webui/core";
import { DateTextInput } from "../../../packages/calendar/src";
import * as React from "react";
import { useState } from "react";

export default {
  title: "examples/Calendar",
};

export const Centered = () => {
  const [value, setValue] = useState("");

  return (
    <Column alignItems={"center"} justifyContent={"center"} height={"800px"}>
      <DateTextInput value={value} onValueChange={setValue} />
    </Column>
  );
};
