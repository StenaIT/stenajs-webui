export interface TravelDateInputValue {
  /*
  User input, so no specific format.
  Need to be parsed with parseLocalizedDateString()
  */
  startDate?: string;
  endDate?: string;
}
