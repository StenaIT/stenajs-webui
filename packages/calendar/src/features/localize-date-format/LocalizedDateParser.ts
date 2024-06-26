import { parse } from "date-fns";
import { getDateFormatForLocaleCode } from "./DateFormatProvider";
import { getLocaleForLocaleCode } from "./LocaleMapper";

export const parseLocalizedDateString = (
  dateString: string,
  localeCode: string,
  referenceDate: Date = new Date()
): Date =>
  parse(dateString, getDateFormatForLocaleCode(localeCode), referenceDate, {
    locale: getLocaleForLocaleCode(localeCode),
  });
