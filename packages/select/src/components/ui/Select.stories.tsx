import { Box, Indent, Spacing } from "@stenajs-webui/core";
import { Select } from "@stenajs-webui/select";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("select/Select", module)
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
        hideSelectedOptions={false}
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
              variant={"dark"}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  ))
  .add("with group headings", () => (
    <div style={{ width: "400px" }}>
      <Indent num={4}>
        <Spacing num={4}>
          <Select
            options={[
              {
                label: "Group heading 1",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias"
                  },
                  {
                    value: "Johan",
                    label: "Johan"
                  }
                ]
              },
              {
                label: "Group heading 2",
                options: [
                  {
                    value: "Niklas",
                    label: "Niklas"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace"
                  }
                ]
              }
            ]}
          />
        </Spacing>
      </Indent>
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
              variant={"dark"}
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
