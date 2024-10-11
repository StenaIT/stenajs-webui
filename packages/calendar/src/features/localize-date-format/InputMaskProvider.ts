export const yearMask = [/[1-2]/, /\d/, /\d/, /\d/];
export const monthMask = [/[0-1]/, /\d/];
export const dayMask = [/[0-3]/, /\d/];

export const createInputMaskForDateFormat = (
  dateFormat: string, // For example: yyyy-MM-dd
): Array<string | RegExp> => {
  const l = splitByNewLetter(dateFormat);
  return l.flatMap(tokenToMask);
};

const tokenToMask = (token: string): Array<string | RegExp> => {
  switch (token) {
    case "yyyy":
      return yearMask;
    case "mm":
    case "MM":
      return monthMask;
    case "dd":
    case "DD":
      return dayMask;
    default:
      return [token];
  }
};

const splitByNewLetter = (str: string): Array<string> => {
  if (str.length === 0) return [];

  const result: Array<string> = [];
  let currentSegment = str[0];

  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      result.push(currentSegment);
      currentSegment = str[i];
    } else {
      currentSegment += str[i];
    }
  }

  result.push(currentSegment);
  return result;
};
