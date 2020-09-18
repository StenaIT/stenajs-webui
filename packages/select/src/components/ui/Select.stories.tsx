import { Box, Indent, Spacing } from "@stenajs-webui/core";
import { Select } from "@stenajs-webui/select";
import * as React from "react";

export default {
  title: "select/Select"
};

export const Standard = () => (
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
);

Standard.storyName = "standard";

export const Multiselect = () => (
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
);

Multiselect.storyName = "multiselect";

export const StandardDark = () => (
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
);

StandardDark.storyName = "standard dark";

export const WithGroupHeadings = () => (
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
);

WithGroupHeadings.storyName = "with group headings";

export const MultiselectDark = () => (
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
);

MultiselectDark.storyName = "multiselect dark";

export const Disabled = () => (
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
);

Disabled.storyName = "disabled";
