export type CalendarPreset = DatePreset | DateRangePreset;

export interface DatePreset {
  label: string;
  date: Date;
}

export interface DateRangePreset {
  label: string;
  startDate: Date;
  endDate: Date;
}

export interface PresetPage {
  label: string;
  presets: Array<CalendarPreset>;
}
