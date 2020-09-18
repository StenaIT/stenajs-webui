import { PresetPage } from "./CalendarPreset";
import { addDays, subDays } from "date-fns";

export const createStandardDateRangePresets = (
  now: Date
): Array<PresetPage> => [
  {
    label: "Past",
    presets: [
      { label: "Last 3 days", startDate: now, endDate: subDays(now, 2) },
      { label: "Last 7 days", startDate: now, endDate: subDays(now, 6) },
      { label: "Last 30 days", startDate: now, endDate: subDays(now, 29) },
      { label: "Last 45 days", startDate: now, endDate: subDays(now, 44) },
    ],
  },
  {
    label: "Future",
    presets: [
      { label: "Next 3 days", startDate: now, endDate: addDays(now, 2) },
      { label: "Next 7 days", startDate: now, endDate: addDays(now, 6) },
      { label: "Next 30 days", startDate: now, endDate: addDays(now, 29) },
      { label: "Next 45 days", startDate: now, endDate: addDays(now, 44) },
    ],
  },
];
