import { TimeTextInput } from "./TimeTextInput";
import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";

export default {
  title: "calendar/Input/TimeTextInput",
  component: TimeTextInput,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} />
    </Box>
  );
};

export const Empty = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} />
    </Box>
  );
};

export const WithTime = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} />
    </Box>
  );
};

export const WithInvalidTime = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} />
    </Box>
  );
};

export const WithoutIcon = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} useIcon={false} />
    </Box>
  );
};

export const WithoutPlaceholder = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput
        value={value}
        onValueChange={setValue}
        showPlaceholder={false}
      />
    </Box>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput value={value} onValueChange={setValue} disabled={true} />
    </Box>
  );
};

export const InvalidTime = () => (
  <Box width={"125px"}>
    <TimeTextInput value={"invalid"} />
  </Box>
);

export const WithVariantModified = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Box width={"125px"}>
      <TimeTextInput
        value={value}
        onValueChange={setValue}
        variant={"modified"}
      />
    </Box>
  );
};
