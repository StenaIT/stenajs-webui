import { format } from "date-fns";
import { getDateFormatForLocaleCode } from "./DateFormatProvider";
import { getLocaleForLocaleCode } from "./LocaleMapper";

export const formatLocalizedDate = (date: Date, localeCode: string): string =>
  format(date, getDateFormatForLocaleCode(localeCode), {
    locale: getLocaleForLocaleCode(localeCode),
  });
