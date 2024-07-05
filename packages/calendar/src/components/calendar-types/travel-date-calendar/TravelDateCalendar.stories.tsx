import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateCalendar } from "./TravelDateCalendar";
import { Column, Row, Spacing } from "@stenajs-webui/core";
import { Banner, Label } from "@stenajs-webui/elements";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";

export default {
  title: "calendar/Calendar/TravelDateCalendar",
  component: TravelDateCalendar,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
      />
    </div>
  );
};

export const WithHeading = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
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
  const [value, setValue] = useState<string>("");

  return (
    <Column gap={2}>
      <Row>
        <Banner headerText={"Locale: " + localeCode} variant={"info"} />
      </Row>
      <Row>
        <TravelDateCalendar
          value={value}
          onValueChange={setValue}
          localeCode={localeCode}
        />
      </Row>
    </Column>
  );
};

export const ParseDate = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [value, setValue] = useState<string>("");

  const setValueHandler = (value: string) => {
    setValue(value);
    if (value) {
      setDate(parseLocalizedDateString(value, "sv"));
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValueHandler}
        localeCode={"sv"}
        heading={"Select dates"}
      />
      <Spacing num={2} />
      <Row gap={4}>
        <Label text={"Date"}>{date?.toDateString() ?? "-"}</Label>
      </Row>
    </div>
  );
};
