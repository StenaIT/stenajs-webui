import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateCalendar } from "./TravelDateCalendar";
import { Column, Heading, Row, Spacing } from "@stenajs-webui/core";
import { Banner, Label } from "@stenajs-webui/elements";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { isToday } from "date-fns";

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
        heading={"Select date"}
      />
    </div>
  );
};

export const WithLabelledInput = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select date"}
        textInputVariant={"labelled"}
      />
    </div>
  );
};

export const WithTestIds = () => {
  const [value, setValue] = useState<string>("");

  const testId = (date: Date) => {
    if (isToday(date)) {
      return "today";
    }
    return undefined;
  };

  const previousMonthButtonTestId = "prev-month-button";
  const nextMonthButtonTestId = "next-month-button";

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        dateTestId={testId}
        previousMonthButtonTestId={previousMonthButtonTestId}
        nextMonthButtonTestId={nextMonthButtonTestId}
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

export const Sizes = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Row gap={4}>
      {(["standard", "labelled"] as const).map((variant) => (
        <Column gap={4} indent={4}>
          <Heading>{variant}</Heading>
          {(["small", "medium", "large"] as const).map((size) => (
            <Column gap={2}>
              <Heading>{size}</Heading>
              <Row>
                <TravelDateCalendar
                  value={value}
                  onValueChange={setValue}
                  localeCode={"sv"}
                  size={size}
                  textInputVariant={variant}
                />
              </Row>
            </Column>
          ))}
        </Column>
      ))}
    </Row>
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
        heading={"Select date"}
      />
      <Spacing num={2} />
      <Row gap={4}>
        <Label text={"Date"}>{date?.toDateString() ?? "-"}</Label>
      </Row>
    </div>
  );
};

export const WithBlurPlaceholders = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        placeholderWhenBlurred={"Gimme date"}
      />
    </div>
  );
};
