import { Box, Indent, Spacing } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { selectThemeDark } from "../../SelectTheme";
import { Select } from "./Select";

storiesOf("select/Select", module)
  .addDecorator(withInfo())
  .add("standard", () => (
    <div style={{ width: "400px" }}>
      <Select
        options={[
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
        ]}
      />
    </div>
  ))
  .add("multiselect", () => (
    <div style={{ width: "400px" }}>
      <Select
        isMulti
        options={[
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
        ]}
      />
    </div>
  ))
  .add("standard dark", () => (
    <div style={{ width: "400px" }}>
      <Box background={"#2e4662"}>
        <Indent num={4}>
          <Spacing num={4}>
            <Select
              options={[
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
              ]}
              theme={selectThemeDark}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  ))
  .add("multiselect dark", () => (
    <div style={{ width: "600px" }}>
      <Box background={"#2e4662"}>
        <Indent num={4}>
          <Spacing num={4}>
            <Select
              isMulti
              options={[
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
              ]}
              theme={selectThemeDark}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  ))
  .add("disabled", () => (
    <div style={{ width: "400px" }}>
      <Select
        options={[
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
        ]}
        isDisabled={true}
      />
    </div>
  ));
