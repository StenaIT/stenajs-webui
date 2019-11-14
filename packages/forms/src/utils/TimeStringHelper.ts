import { HourAndMinutes } from "./types/HoursAndMinutes";

export const getHoursAndMinutesFromString = (
  durationString: string,
  separator: string = ":"
): HourAndMinutes | undefined => {
  if (!durationString) {
    return undefined;
  }
  try {
    if (durationString.indexOf(separator) < 0) {
      return {
        hours: 0,
        minutes: parseInt(durationString, 10)
      };
    }
    const [hours, minutes] = durationString.split(separator);
    return {
      hours: Math.abs(parseInt(hours || "0", 10)),
      minutes: Math.min(59, Math.abs(parseInt(minutes || "0", 10)))
    };
  } catch (e) {
    return undefined;
  }
};

export const formatHoursAndMinutesToString = (
  time: HourAndMinutes,
  separator: string = ":"
) => `${time.hours}${separator}${time.minutes}`;
