export const fieldsMatch = <T>(entity: T, fields: Partial<T>): boolean => {
  const keys = Object.keys(fields) as Array<keyof T>;
  if (keys.length === 0) {
    return false;
  }
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (entity[key] !== fields[key]) {
      return false;
    }
  }
  return true;
};
