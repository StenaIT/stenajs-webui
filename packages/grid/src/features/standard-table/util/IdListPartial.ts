export const getIdsBetweenSelected = (
  idList: Array<string> | undefined,
  selected1: string | undefined,
  selected2: string | undefined
): Array<string> | undefined => {
  if (selected1 == null || selected2 == null || idList == null) {
    return undefined;
  }

  if (selected1 === selected2) {
    return undefined;
  }

  const i1 = idList.indexOf(selected1);
  const i2 = idList.indexOf(selected2);

  if (i1 < 0 || i2 < 0) {
    return undefined;
  }

  const start = Math.min(i1, i2);
  const end = Math.max(i1, i2);

  return idList.slice(start, end + 1);
};
