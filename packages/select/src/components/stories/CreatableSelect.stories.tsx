import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import { CreatableSelect } from "../ui/CreatableSelect";

export default {
  title: "select/CreatableSelect",
  component: CreatableSelect,
};

export const _CreatableSelect = () => (
  <div style={{ width: "400px" }}>
    <Box indent spacing>
      <Text size={"small"}>
        A chance to select your favorite person on Earth! But Markus is not
        selectable...
      </Text>
    </Box>
    <CreatableSelect
      options={[
        {
          value: "Mattias the menace",
          label: "Mattias the menace",
        },
        {
          value: "Johan",
          label: "Johan",
        },
        {
          value: "Dennis",
          label: "Dennis",
        },
      ]}
      noOptionsMessage={({ inputValue }) =>
        `Please, nobody likes ${inputValue}!`
      }
      formatCreateLabel={(inputValue) => `Select '${inputValue}'`}
      placeholder={"Select or write down your favorite person..."}
      isValidNewOption={(inputText) =>
        inputText.length > 0 && inputText.toLowerCase() !== "markus"
      }
    />
  </div>
);
