import { parseLocalizedDateString } from "./LocalizedDateParser";
import { formatLocalizedDate } from "./LocalizedDateFormatter";

export const reformatLocalizedDateString = (
  dateString: string,
  locale: string
): string | undefined => {
  const d = parseLocalizedDateString(dateString, locale);
  if (d == null) {
    return undefined;
  }
  return formatLocalizedDate(d, locale);
};
