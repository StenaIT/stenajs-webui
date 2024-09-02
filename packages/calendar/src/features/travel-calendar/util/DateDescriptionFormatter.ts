import { format, Locale } from "date-fns";

export const formatDateDescription = (date: Date, locale: Locale) => {
  if (locale.code.startsWith("en")) {
    return format(date, "eee MMM d", { locale });
  } else {
    return format(date, "eee d MMM", { locale });
  }
};

export const formatDateDescriptionLong = (date: Date, locale: Locale) => {
  if (locale.code.startsWith("en")) {
    return format(date, "eeee MMMM d", { locale });
  } else {
    return format(date, "eeee d MMMM", { locale });
  }
};
