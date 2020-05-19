export const formatValueLabel = <T>(itemValue: T) => {
  if (itemValue == null) {
    return "";
  } else if (itemValue instanceof Date) {
    return itemValue.toISOString();
  } else if (typeof itemValue === "object") {
    return JSON.stringify(itemValue);
  } else {
    return String(itemValue);
  }
};
