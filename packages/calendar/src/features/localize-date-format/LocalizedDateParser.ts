import { parse } from "date-fns";
import { getDateFormatForLocaleCode } from "./DateFormatProvider";
import { getLocaleForLocaleCode } from "./LocaleMapper";

export const parseLocalizedDateString = (
  dateString: string,
  localeCode: string,
  referenceDate?: Date
): Date | undefined => {
  const locale = getLocaleForLocaleCode(localeCode);

  if (locale == null) {
    return undefined;
  }

  const date = parse(
    dateString,
    getDateFormatForLocaleCode(localeCode),
    referenceDate ?? new Date(),
    {
      locale: locale,
    }
  );

  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
};
