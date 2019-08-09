import { DayState, DayStateHighlight } from "../../types/CalendarTypes";

export const dayHasHighlight = (
  dayState: DayState | undefined,
  defaultHighlights: Array<DayStateHighlight> | undefined,
  highlight: string
): boolean => {
  if (defaultHighlights && defaultHighlights.indexOf(highlight) >= 0) {
    return true;
  }
  if (
    dayState &&
    dayState.highlights &&
    dayState.highlights.indexOf(highlight) >= 0
  ) {
    return true;
  }
  return false;
};

export const dayHighlightSelect = <T>(
  dayState: DayState | undefined,
  defaultHighlights: Array<DayStateHighlight> | undefined,
  highlightsOrBoolean: Array<string | boolean>,
  returnValues: Array<T>,
  fallbackValue?: T
): T | undefined => {
  if (highlightsOrBoolean.length !== returnValues.length) {
    throw new Error(
      "Select highlight failed, number of values do not equal number of highlights."
    );
  }
  if (highlightsOrBoolean.length === 0) {
    return fallbackValue;
  }
  for (let i = 0; i < highlightsOrBoolean.length; i++) {
    if (typeof highlightsOrBoolean[i] === "boolean" && highlightsOrBoolean[i]) {
      return returnValues[i];
    }
    if (
      typeof highlightsOrBoolean[i] === "string" &&
      dayHasHighlight(dayState, defaultHighlights, highlightsOrBoolean[
        i
      ] as string)
    ) {
      return returnValues[i];
    }
  }
  return fallbackValue;
};
