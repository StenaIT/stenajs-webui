import * as React from "react";
import { LabelledSelect } from "./LabelledSelect";
import { Box } from "@stenajs-webui/core";
import { LabelledTextInput } from "../labelled-text-input/LabelledTextInput";

export default {
  title: "forms/LabelledSelect",
  component: LabelledSelect,
};

const options = (
  <>
    <option id={"1"} value={"dev"}>
      Developer
    </option>
    <option id={"2"} value={"man"}>
      Manager
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

export const Combined = () => (
  <Box gap={5}>  
    <Box width={"500px"} display={"flex"} flexDirection={"row"}>
      <LabelledSelect
        label={"Who rocks?"}
        name={"thebest"}
        borderVariant="onlyLeftBorder"
        onValueChange={(v) => console.log("Changed to", v)}
      >
        {options}
      </LabelledSelect>
      <LabelledTextInput
        label={"Who rocks?"}
        name={"thebest"}
        borderRadiusVariant="onlyRight"
        onValueChange={(v) => console.log("Changed to", v)}
      />
    </Box>
    <Box width={"500px"} display={"flex"} flexDirection={"row"}>
      <LabelledTextInput
        label={"Who rocks?"}
        name={"thebest"}
        borderRadiusVariant="onlyLeft"
        onValueChange={(v) => console.log("Changed to", v)}
      />
      <LabelledSelect
        label={"Who rocks?"}
        name={"thebest"}
        borderVariant="onlyRightBorder"
        onValueChange={(v) => console.log("Changed to", v)}
      >
        {options}
      </LabelledSelect>
    </Box>
  </Box>

);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
