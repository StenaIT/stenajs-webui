export const transformNumberTimeToString = (
  time: number | undefined | null
): string | undefined => {
  if (time == null) {
    return undefined;
  }
  const timeStr = time.toString();
  if (timeStr.length === 3) {
    return `${timeStr.substr(0, 1)}:${timeStr.substr(1, 2)}`;
  }
  if (timeStr.length === 4) {
    return `${timeStr.substr(0, 2)}:${timeStr.substr(2, 2)}`;
  }
  if (timeStr.length === 2) {
    return `0:${timeStr}`;
  }
  if (timeStr.length === 1) {
    return `0:0${timeStr}`;
  }
  throw new Error("Invalid time number.");
};

export const transformTimeStringToNumber = (
  time: string | undefined | null
): number | null => {
  if (time == null) {
    throw new Error("Time is not set.");
  }
  if (time === "") {
    throw new Error("Time is empty.");
  }
  const parts = time.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid time.");
  }

  if (parts[1].length !== 2) {
    throw new Error("Invalid time.");
  }

  if (parts[0].length < 1 || parts[0].length > 2) {
    throw new Error("Invalid time.");
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (isNaN(hours)) {
    throw new Error("Invalid time.");
  }
  if (isNaN(minutes)) {
    throw new Error("Invalid time.");
  }
  if (hours < 0 || hours > 23) {
    throw new Error("Invalid time.");
  }
  if (minutes < 0 || minutes > 59) {
    throw new Error("Invalid time.");
  }
  return hours * 100 + minutes;
};

export const isValidTimeString = (time: string | undefined): boolean => {
  try {
    transformTimeStringToNumber(time);
    return true;
  } catch (e) {
    return false;
  }
};
