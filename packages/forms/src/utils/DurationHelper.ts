import { HourAndMinutes } from "./types/HoursAndMinutes";

export const getNumHoursAndMinutesFromMinutes = (
  numMinutes?: number
): HourAndMinutes => {
  if (numMinutes == null || numMinutes < 0) {
    return {
      minutes: 0,
      hours: 0
    };
  }
  return {
    hours: Math.floor(numMinutes / 60),
    minutes: numMinutes % 60
  };
};
