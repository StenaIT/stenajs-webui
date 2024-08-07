import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateRangeInput } from "./TravelDateRangeInput";
import { Column, Row, Spacing } from "@stenajs-webui/core";
import {
  Banner,
  Label,
  PrimaryButton,
  SecondaryButton,
} from "@stenajs-webui/elements";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { formatLocalizedDate } from "../../../features/localize-date-format/LocalizedDateFormatter";
import { addWeeks } from "date-fns";

export default {
  title: "calendar/Input/TravelDateRangeInput",
  component: TravelDateRangeInput,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateRangeInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
      />
    </div>
  );
};

export const WithHeading = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateRangeInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
      />
    </div>
  );
};

export const ParseDate = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  const setValueHandler = (value: TravelDateRangeInputValue) => {
    setValue(value);
    if (value.startDate) {
      setStartDate(parseLocalizedDateString(value.startDate, "sv"));
    }
    if (value.endDate) {
      setEndDate(parseLocalizedDateString(value.endDate, "sv"));
    }
  };

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateRangeInput
        value={value}
        onValueChange={setValueHandler}
        localeCode={"sv"}
        heading={"Select dates"}
      />
      <Spacing num={4} />
      <Row gap={4}>
        <Label text={"Start date"}>{startDate?.toDateString() ?? "-"}</Label>
        <Label text={"End date"}>{endDate?.toDateString() ?? "-"}</Label>
      </Row>
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
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <Column gap={2} indent={5}>
      <Row>
        <Banner headerText={"Locale: " + localeCode} variant={"info"} />
      </Row>
      <Row>
        <TravelDateRangeInput
          value={value}
          onValueChange={setValue}
          localeCode={localeCode}
          heading={"Select dates"}
        />
      </Row>
    </Column>
  );
};

export const WithValidationAndCloseButton = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateRangeInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
        renderBelowCalendar={({ hideCalendar }) => {
          return (
            <Column gap={2}>
              <Banner variant={"error"} text={"Your dates are not good."} />
              <PrimaryButton label={"Close"} onClick={hideCalendar} />
            </Column>
          );
        }}
      />
    </div>
  );
};

export const WithPresets = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateRangeInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
        renderBelowCalendar={() => {
          return (
            <Column gap={2}>
              <SecondaryButton
                label={"1 week starting today"}
                onClick={() =>
                  setValue({
                    startDate: formatLocalizedDate(new Date(), "sv"),
                    endDate: formatLocalizedDate(addWeeks(new Date(), 1), "sv"),
                  })
                }
              />
              <SecondaryButton
                label={"2 weeks starting today"}
                onClick={() =>
                  setValue({
                    startDate: formatLocalizedDate(new Date(), "sv"),
                    endDate: formatLocalizedDate(addWeeks(new Date(), 2), "sv"),
                  })
                }
              />
            </Column>
          );
        }}
      />
    </div>
  );
};
