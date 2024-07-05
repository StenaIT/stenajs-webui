export interface TravelDateRangeInputValue {
  /*
  User input, so no specific format.
  Need to be parsed with parseLocalizedDateString()
  */
  startDate?: string;
  endDate?: string;
}

export type VisiblePanel = "calendar" | "month-picker";
