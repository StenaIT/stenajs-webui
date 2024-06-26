import { Locale, parse } from "date-fns";

export const parseLocalizedDateStringElseUndefined = (
  dateString: string,
  locale: Locale
): Date | undefined => {
  return parse(dateString, locale.code, new Date());
};
