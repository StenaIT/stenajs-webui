// Define the supported locales

import { SupportedLocaleCode } from "./LocaleMapper";

export const getDateFormatForLocaleCode = (
  localeCode: SupportedLocaleCode,
): string => {
  const formatter = new Intl.DateTimeFormat(localeCode, { dateStyle: "short" });
  const parts = formatter.formatToParts(new Date());
  const formatMap: { [key: string]: string } = {
    year: "yyyy",
    month: "MM",
    day: "dd",
  };
  return parts.map((part) => formatMap[part.type] || part.value).join("");
};
