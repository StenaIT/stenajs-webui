import * as React from "react";
import { LabelledSelect } from "./LabelledSelect";

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
  <LabelledSelect
    label={"Who rocks?"}
    name={"thebest"}
    onValueChange={(v) => console.log("Changed to", v)}
  >
    {options}
  </LabelledSelect>
);

export const Mobile = () => (
  <LabelledSelect
    label={"Who rocks?"}
    name={"thebest"}
    onValueChange={(v) => console.log("Changed to", v)}
  >
    {options}
  </LabelledSelect>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
