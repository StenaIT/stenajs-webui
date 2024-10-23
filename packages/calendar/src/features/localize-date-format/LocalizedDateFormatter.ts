import { format } from "date-fns";
import { getDateFormatForLocaleCode } from "./DateFormatProvider";
import {
  fallbackLocaleCode,
  getLocaleForLocaleCode,
  getSupportedLocaleCode,
  SupportedLocaleCode,
} from "./LocaleMapper";

export interface FormatLocalizedDateOptions {
  matchLanguage?: boolean;
  fallbackLocaleCode?: SupportedLocaleCode;
}

export const formatLocalizedDate = (
  date: Date,
  localeCode: string,
  options?: FormatLocalizedDateOptions,
): string => {
  const l = getSupportedLocaleCode(
    localeCode,
    options?.matchLanguage ?? false,
    options?.fallbackLocaleCode ?? fallbackLocaleCode,
  );
  return format(date, getDateFormatForLocaleCode(l), {
    locale: getLocaleForLocaleCode(l),
  });
};
