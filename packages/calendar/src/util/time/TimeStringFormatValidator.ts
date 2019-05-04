export interface FormatTimeStringResult {
  time: string;
  success: boolean;
}

export const formatHours = (hours: string): string => {
  if (hours === '') {
    return '00';
  }

  const h = parseInt(hours, 10);

  if (isNaN(h)) {
    throw new Error('Hours is not a number');
  }

  if (h < 0 || h > 23) {
    throw new Error('Hours is an invalid number');
  }

  switch (hours.length) {
    case 1:
      return `0${h}`;
    case 2:
      return hours;
    default:
      throw new Error('Invalid hour string');
  }

  return hours;
};

export const formatMinutes = (minutes: string): string => {
  if (minutes === '') {
    return '00';
  }

  const m = parseInt(minutes, 10);

  if (isNaN(m)) {
    throw new Error('Minutes is not a number');
  }

  if (m < 0 || m > 59) {
    throw new Error('Minutes is an invalid number');
  }

  switch (minutes.length) {
    case 1:
      return `${m}0`;
    case 2:
      return minutes;
    default:
      throw new Error('Invalid minute string');
  }
  return minutes;
};

export const formatTimeString = (time: string): FormatTimeStringResult => {
  if (!validUserInput(time)) {
    return { time, success: false };
  }

  const arr = time && time.split(/-|:|,|;|[/]|[.]| /); // consider all these chars as user input separator
  if (arr && arr.length === 2) {
    try {
      const hours = formatHours(arr[0]);
      const minutes = formatMinutes(arr[1]);
      return { time: `${hours}:${minutes}`, success: true };
    } catch {
      return { time, success: false };
    }
  } else if (arr && arr.length === 1) {
    let hours = 0;
    let minutes = 0;
    switch (time.length) {
      case 1:
        return { time: `0${time}:00`, success: true };
      case 2:
        const timeNumber = parseInt(arr[0], 10);
        if (timeNumber >= 0 && timeNumber < 24) {
          return { time: `${time}:00`, success: true };
        } else if (timeNumber >= 24 && timeNumber < 59) {
          return { time: `00:${time}`, success: true };
        }
        return { time, success: false };
      case 3:
        minutes = parseInt(time.substr(1, 2), 10);
        if (minutes >= 0 && minutes <= 59) {
          return {
            time: `0${time.substr(0, 1)}:${time.substr(1, 2)}`,
            success: true,
          };
        }
        return { time, success: false };
      case 4:
        hours = parseInt(time.substr(0, 2), 10);
        minutes = parseInt(time.substr(2, 2), 10);
        if (hours < 0 || hours > 23) {
          return { time, success: false };
        }
        if (minutes < 0 || minutes > 59) {
          return { time, success: false };
        }
        return {
          time: `${time.substr(0, 2)}:${time.substr(2, 2)}`,
          success: true,
        };
      default:
        return { time, success: false };
    }
  }

  return { time, success: false };
};

export const validUserInput = (input: string | undefined): boolean => {
  if (input) {
    return /^[-:.,/; 0-9]+$/.test(input);
  }

  return true;
};
