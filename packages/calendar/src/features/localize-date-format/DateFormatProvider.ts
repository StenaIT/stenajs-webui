// Define the supported locales

export const getDateFormatForLocaleCode = (locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "short" });
  const parts = formatter.formatToParts(new Date());
  const formatMap: { [key: string]: string } = {
    year: "yyyy",
    month: "MM",
    day: "dd",
  };
  return parts.map((part) => formatMap[part.type] || part.value).join("");
};
