import { addMonths } from "date-fns";
import { Position } from "./Position";

export interface MonthInput {
  yearOrder: Array<number>;
  years: Record<number, YearInput>;
  rows: Array<RowInput>;
  lastMonthRow: number;
  lastMonthColumn: number;
}

export interface YearInput {
  year: number;
  rows: Array<number>;
}

export interface RowInput {
  rowIndex: number;
  columns: Array<Columns>;
}

export interface Columns {
  position: Position;
  month: Date;
}

export const createMonths = (
  firstMonth: Date,
  numMonths: number,
  numColumnsPerRow: number
): MonthInput => {
  let currentYear = firstMonth.getFullYear();
  let currentRow = 0;
  let currentColumn = 0;
  let currentMonth = firstMonth;

  const input: MonthInput = {
    yearOrder: [],
    rows: [],
    years: {},
    lastMonthColumn: -1,
    lastMonthRow: -1,
  };

  for (let i = 0; i < numMonths; i++) {
    if (input.years[currentYear] == null) {
      input.yearOrder.push(currentYear);
      input.years[currentYear] = { year: currentYear, rows: [] };
    }

    input.rows[currentRow] = input.rows[currentRow] ?? {
      columns: [],
      rowIndex: currentRow,
    };

    input.rows[currentRow].columns[currentColumn] = {
      position: {
        column: currentColumn,
        row: currentRow,
      },
      month: currentMonth,
    };

    if (i === numMonths - 1) {
      // Last one, add it and exit
      input.years[currentYear].rows.push(currentRow);
      break;
    }

    currentMonth = addMonths(currentMonth, 1);

    if (currentMonth.getFullYear() !== currentYear) {
      input.years[currentYear].rows.push(currentRow);
      currentYear++;
      currentColumn = 0;
      currentRow++;
    } else {
      currentColumn++;
      if (currentColumn > numColumnsPerRow - 1) {
        input.years[currentYear].rows.push(currentRow);
        currentColumn = 0;
        currentRow++;
      }
    }
  }

  input.lastMonthColumn = currentColumn;
  input.lastMonthRow = currentRow;

  return input;
};
