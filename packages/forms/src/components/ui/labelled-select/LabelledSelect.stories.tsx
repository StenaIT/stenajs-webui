import * as React from "react";
import { LabelledSelect } from "./LabelledSelect";
import { Box } from "@stenajs-webui/core";

export default {
  title: "forms/LabelledSelect",
  component: LabelledSelect,
};

const options = (
  <>
    <option id={"1"} value={"dev"}>
      Developer
    </option>
    <option id={"2"} value={"des"}>
      Designer
    </option>
  </>
);

export const Desktop = () => (
  <Box width={"250px"}>
    <LabelledSelect
      label={"Who rocks?"}
      name={"thebest"}
      onValueChange={(v) => console.log("Changed to", v)}
    >
      {options}
    </LabelledSelect>
  </Box>
);

export const Mobile = () => (
  <Box width={"250px"}>
    <LabelledSelect
      label={"Who rocks?"}
      name={"thebest"}
      onValueChange={(v) => console.log("Changed to", v)}
    >
      {options}
    </LabelledSelect>
  </Box>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
