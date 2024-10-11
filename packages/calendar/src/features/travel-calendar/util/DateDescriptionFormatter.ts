import { format, isSameYear, Locale } from "date-fns";

export const formatDateDescription = (
  date: Date,
  today: Date,
  locale: Locale,
) => {
  const year = isSameYear(date, today) ? "" : " y";
  if (locale.code.startsWith("en")) {
    return format(date, "eee MMM d" + year, { locale }).replace(".", "");
  } else {
    return format(date, "eee d MMM" + year, { locale }).replace(".", "");
  }
};

export const formatDateDescriptionLong = (
  date: Date,
  today: Date,
  locale: Locale,
) => {
  const year = isSameYear(date, today) ? "" : " y";
  if (locale.code.startsWith("en")) {
    return format(date, "eeee MMMM d" + year, { locale });
  } else {
    return format(date, "eeee d MMMM" + year, { locale });
  }
};
