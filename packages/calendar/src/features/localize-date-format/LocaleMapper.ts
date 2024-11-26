import { Locale } from "date-fns";
import {
  da,
  de,
  deAT,
  enGB,
  enIE,
  enUS,
  es,
  cs,
  it,
  fi,
  fr,
  lv,
  nb,
  nl,
  et,
  nlBE,
  pl,
  lt,
  sv,
} from "date-fns/locale";

type LocalesMap = {
  [key: string]: Locale;
};

export type SupportedLocaleCode =
  | "en"
  | "en-US"
  | "en-GB"
  | "en-IE"
  | "de-AT"
  | "nl-BE"
  | "nl-NL"
  | "de-DE"
  | "nb-NO"
  | "sv-SE"
  | "da-DK"
  | "lv-LV"
  | "lt-LT"
  | "it-IT"
  | "et-EE"
  | "fi-FI"
  | "cs-CZ"
  | "es-ES"
  | "fr-FR"
  | "pl-PL"
  | "nl"
  | "de"
  | "nb"
  | "sv"
  | "da"
  | "lv"
  | "lt"
  | "it"
  | "et"
  | "fi"
  | "cs"
  | "es"
  | "fr"
  | "pl";

const locales: LocalesMap = {
  en: enGB,
  "en-US": enUS,
  "en-GB": enGB,
  "en-IE": enIE,
  "de-AT": deAT,
  "nl-BE": nlBE,
  "nl-NL": nl,
  "de-DE": de,
  "nb-NO": nb,
  "sv-SE": sv,
  "da-DK": da,
  "lv-LV": lv,
  "lt-LT": lt,
  "it-IT": it,
  "et-EE": et,
  "fi-FI": fi,
  "cs-CZ": cs,
  "es-ES": es,
  "fr-FR": fr,
  "pl-PL": pl,
  nl,
  de,
  nb,
  sv,
  da,
  lv,
  lt,
  it,
  et,
  fi,
  cs,
  es,
  fr,
  pl,
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
    const languageCode = getSupportedLocaleCodeMatchingLanguage(localeCode);
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

export const getSupportedLocaleCodeMatchingLanguage = (
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
