import { Box, Indent, Spacing } from "@stenajs-webui/core";
import { AsyncSelect, selectThemeDark } from "@stenajs-webui/select";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("select/AsyncSelect", module)
  .add("async select", () => (
    <AsyncSelect
      loadOptions={getOptions}
      defaultOptions={[]}
      cacheOptions
      isSearchable
    />
  ))
  .add("async select dark", () => (
    <div style={{ width: "600px" }}>
      <Box background={"#2e4662"}>
        <Indent num={4}>
          <Spacing num={4}>
            <AsyncSelect
              loadOptions={getOptions}
              defaultOptions={[]}
              cacheOptions
              isSearchable
              theme={selectThemeDark}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  ));

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
