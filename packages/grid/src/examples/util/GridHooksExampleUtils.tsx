export const createIndexArray = (length: number) =>
  Array.from(Array(length).keys());

const names = ["mattias", "dennis", "johan", "anna", "chris"];

const getRandomName = () => {
  const r = Math.floor(Math.random() * names.length);
  return names[r];
};

export const createRows = () =>
  createIndexArray(10).map(() =>
    createIndexArray(10).map(() => getRandomName())
  );

export interface CustomValueCell {
  row: number;
  col: number;
  name: string;
}

export const createCustomValueRows = (): CustomValueCell[][] =>
  createIndexArray(10).map(i =>
    createIndexArray(10).map(j => ({ row: i, col: j, name: getRandomName() }))
  );
