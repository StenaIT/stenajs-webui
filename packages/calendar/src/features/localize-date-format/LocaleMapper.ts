import { Locale } from "date-fns";
import {
  da,
  de,
  deAT,
  enGB,
  enUS,
  es,
  fr,
  nb,
  nl,
  pl,
  sv,
} from "date-fns/locale";

type LocalesMap = {
  [key: string]: Locale;
};

export type SupportedLocaleCode =
  | "en-US"
  | "en-GB"
  | "de-AT"
  | "de-DE"
  | "sv-SE"
  | "da-DK"
  | "fr"
  | "de"
  | "es"
  | "sv"
  | "pl"
  | "da"
  | "nl"
  | "nb";

const locales: LocalesMap = {
  "en-US": enUS,
  "en-GB": enGB,
  "de-AT": deAT,
  "de-DE": de,
  "sv-SE": sv,
  "da-DK": da,
  fr,
  de,
  es,
  sv,
  pl,
  da,
  nl,
  nb,
};

export const fallbackLocaleCode: SupportedLocaleCode = "en-GB";
export const fallbackLocaleCodeForFormatting: SupportedLocaleCode = "sv";

export const getSupportedLocaleCode = (
  localeCode: string,
  matchLanguage: boolean,
  fallback: SupportedLocaleCode,
): SupportedLocaleCode => {
  if (locales[localeCode]) {
    return localeCode as SupportedLocaleCode;
  }
  if (matchLanguage) {
    const languageCode = getMappedLocaleCodeMatchingLanguage(localeCode);
    if (languageCode) {
      return languageCode;
    }
  }
  return fallback;
};

export const getLocaleForLocaleCode = (
  localeCode: SupportedLocaleCode,
): Locale => {
  return locales[localeCode];
};

export const getMappedLocaleCodeMatchingLanguage = (
  localeCode: string,
): SupportedLocaleCode | undefined => {
  const [lang] = localeCode.split("-");
  const localeCodes = Object.keys(locales);
  for (const l of localeCodes) {
    if (l.startsWith(lang)) {
      return l as SupportedLocaleCode;
    }
  }
  return undefined;
};

export const getDefaultLocaleForFormatting = (): Locale => {
  return locales["sv"];
};

/**
 * This is only used by old calendar components, to pass localeCode to updated components.
 * All updated calendar components just take localeCode, for example "en-GB", since that is what the browser provides,
 * and is not library dependent.
 */
export const getLocaleCodeForLocale = (
  locale: Locale,
): SupportedLocaleCode | undefined => {
  const localeCodes = Object.keys(locales);
  for (const localeCode of localeCodes) {
    if (locales[localeCode].code === locale.code) {
      return localeCode as SupportedLocaleCode;
    }
  }
  return undefined;
};
