import { transformTimeStringToNumber } from './TimeTransformer';

export interface TimeInterval {
  startTime: string;
  endTime: string;
}

export interface TimeIntervalNumber {
  startTime: number | null;
  endTime: number | null;
}

export const transformTimeIntervalToNumbers = (
  interval: TimeInterval,
): TimeIntervalNumber => ({
  startTime: transformTimeStringToNumber(interval.startTime),
  endTime: transformTimeStringToNumber(interval.endTime),
});

export const timesOverlap = (
  i1: TimeIntervalNumber,
  i2: TimeIntervalNumber,
): boolean => {
  if (
    i1.startTime == null ||
    i1.endTime == null ||
    i2.startTime == null ||
    i2.endTime == null
  ) {
    throw new Error('Invalid interval.');
  }
  return i1.startTime <= i2.endTime && i1.endTime >= i2.startTime;
};

export const hasOverlappingTimes = (
  intervals: Array<TimeIntervalNumber>,
): boolean => {
  for (let i = 0; i < intervals.length - 1; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (timesOverlap(intervals[i], intervals[j])) {
        return true;
      }
    }
  }
  return false;
};
