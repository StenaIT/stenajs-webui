import styled from '@emotion/styled';

export const createIndexArray = (length: number) =>
  Array.from(Array(length).keys());

export const FocusedBox = styled('div')(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90px',
    height: '34px',
  },
  ({ isEditable }: FocusedBoxProps) => ({
    ':focus': {
      outline: `${isEditable ? '#605988' : '#cbcbcb'} solid 2px`,
    },
  }),
);

interface FocusedBoxProps {
  isEditable?: boolean;
}

const names = ['mattias', 'dennis', 'johan', 'anna', 'chris'];

const getRandomName = () => {
  const r = Math.floor(Math.random() * names.length);
  return names[r];
};

export const createRows = () =>
  createIndexArray(10).map(() =>
    createIndexArray(10).map(() => getRandomName()),
  );

export interface CustomValueCell {
  row: number;
  col: number;
  name: string;
}

export const createCustomValueRows = (): CustomValueCell[][] =>
  createIndexArray(10).map(i =>
    createIndexArray(10).map(j => ({ row: i, col: j, name: getRandomName() })),
  );
