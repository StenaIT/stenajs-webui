import { parse } from "date-fns";
import { getDateFormatForLocaleCode } from "./DateFormatProvider";
import {
  fallbackLocaleCode,
  getLocaleForLocaleCode,
  getSupportedLocaleCode,
  SupportedLocaleCode,
} from "./LocaleMapper";

interface ParseLocalizedDateStringOptions {
  matchLanguage?: boolean;
  fallbackLocaleCode?: SupportedLocaleCode;
  referenceDate?: Date;
}

export const parseLocalizedDateString = (
  dateString: string,
  localeCode: string,
  options?: ParseLocalizedDateStringOptions,
): Date | undefined => {
  const supportedLocaleCode = getSupportedLocaleCode(
    localeCode,
    options?.matchLanguage ?? false,
    options?.fallbackLocaleCode ?? fallbackLocaleCode,
  );

  const locale = getLocaleForLocaleCode(supportedLocaleCode);

  if (locale == null) {
    return undefined;
  }

  const date = parse(
    dateString,
    getDateFormatForLocaleCode(supportedLocaleCode),
    options?.referenceDate ?? new Date(),
    {
      locale: locale,
    },
  );

  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
};
