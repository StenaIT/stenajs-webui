import { Box, Indent, Spacing } from "@stenajs-webui/core";
import { AsyncSelect } from "@stenajs-webui/select";
import * as React from "react";

export default {
  title: "select/AsyncSelect"
};

export const _AsyncSelect = () => (
  <AsyncSelect
    loadOptions={getOptions}
    defaultOptions={[]}
    cacheOptions
    isSearchable
  />
);

_AsyncSelect.storyName = "async select";

export const AsyncSelectDark = () => (
  <div style={{ width: "600px" }}>
    <Box background={"#2e4662"}>
      <Indent num={4}>
        <Spacing num={4}>
          <AsyncSelect
            loadOptions={getOptions}
            defaultOptions={[]}
            cacheOptions
            isSearchable
            variant={"dark"}
          />
        </Spacing>
      </Indent>
    </Box>
  </div>
);

AsyncSelectDark.storyName = "async select dark";

const getOptions = (): Promise<Array<{ value: string; label: string }>> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: "Mattias",
          label: "Mattias"
        },
        {
          value: "Johan",
          label: "Johan"
        },
        {
          value: "Dennis the menace",
          label: "Dennis the menace"
        }
      ]);
    }, 1500);
  });
