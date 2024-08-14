import * as React from "react";
import { Column, Heading, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { Label } from "./Label";
import { StoryFn } from "@storybook/react";
import { LabelHighlight } from "./LabelHighlight";
import { stenaWeight } from "../../../icons/generated/CommonIcons";

export default {
  title: "elements/LabelHighlight",
  component: LabelHighlight,
};

export const Overview: StoryFn = () => {
  const variants = ["none", "warning", "success", "error"] as const;

  return (
    <Column width={300} gap={4}>
      {variants.map((variant) => (
        <Column gap={2}>
          <Heading>{variant}</Heading>
          <LabelHighlight
            variant={variant}
            label={
              <Label text={"Weight"}>
                <TextInput iconLeft={stenaWeight} />
              </Label>
            }
          >
            {variant !== "none" && (
              <Text>
                Special handling of this vehicle is required. Please advise
                details of the animals to your local booking office as soon as
                possible.
              </Text>
            )}
          </LabelHighlight>
        </Column>
      ))}
    </Column>
  );
};
