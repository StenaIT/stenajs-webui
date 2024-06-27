import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateInput, TravelDateInputValue } from "./TravelDateInput";
import { Column, Row } from "@stenajs-webui/core";
import { Banner } from "@stenajs-webui/elements";

export default {
  title: "calendar/Input/TravelDateInput",
  component: TravelDateInput,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<TravelDateInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
      />
    </div>
  );
};

export const Locales = () => {
  const locales = [
    "sv",
    "da",
    "en-GB",
    "pl",
    "nl",
    "en-US",
    "de-AT",
    "de-DE",
    "fr",
    "de",
    "es",
    "nb",
  ];

  return (
    <Column gap={4}>
      {locales.map((locale) => (
        <LocaleDemo localeCode={locale} />
      ))}
    </Column>
  );
};

const LocaleDemo = ({ localeCode }: { localeCode: string }) => {
  const [value, setValue] = useState<TravelDateInputValue | undefined>(
    undefined
  );

  return (
    <Column gap={2}>
      <Row>
        <Banner headerText={"Locale: " + localeCode} variant={"info"} />
      </Row>
      <Row>
        <TravelDateInput
          value={value}
          onValueChange={setValue}
          localeCode={localeCode}
        />
      </Row>
    </Column>
  );
};
