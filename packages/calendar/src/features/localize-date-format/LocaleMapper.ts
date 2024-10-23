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

const locales: LocalesMap = {
  "en-US": enUS,
  "en-GB": enGB,
  "de-AT": deAT,
  "de-DE": de,
  fr,
  de,
  es,
  sv,
  pl,
  da,
  nl,
  nb,
};

export const getLocaleForLocaleCode = (
  localeCode: string,
): Locale | undefined => {
  return locales[localeCode];
};

export const getDefaultLocaleForFormatting = (): Locale => {
  return locales["sv"];
};

/**
 * This is only used by old calendar components, to pass localeCode to updated components.
 * All updated calendar components just take localeCode, for example "en-GB", since that is what the browser provides,
 * and is not library dependent.
 */
export const getLocaleCodeForLocale = (locale: Locale): string | undefined => {
  const localeCodes = Object.keys(locales);
  for (const localeCode of localeCodes) {
    if (locales[localeCode].code === locale.code) {
      return localeCode;
    }
  }
  return undefined;
};
