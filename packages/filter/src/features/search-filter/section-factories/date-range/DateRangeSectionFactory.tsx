import { BooleanRecordData } from "../boolean-record/BooleanRecordTypes";
import {
  SearchFilterSectionChips,
  SearchFilterSectionOnClickRemoveOnChip,
  SearchFilterSectionRender,
  SetFormModelFields,
} from "../../config/SearchFilterConfig";
import { DateRangeCalendarSection } from "./components/DateRangeCalendarSection";
import * as React from "react";
import { DateRange } from "./DateRangeTypes";
import { format } from "date-fns";

export const createDateRangeSection = <TFormModel extends {}>(
  intervalProvider: (formModel: TFormModel) => DateRange,
  startDateSetter: (
    setFormModelFields: SetFormModelFields<TFormModel>,
    startDate: string | undefined
  ) => void,
  endDateSetter: (
    setFormModelFields: SetFormModelFields<TFormModel>,
    endDate: string | undefined
  ) => void,
  emptyChipLabel: string = "No dates"
): {
  chips: SearchFilterSectionChips<TFormModel>;
  onClickRemoveOnChip: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
  renderEditor: SearchFilterSectionRender<TFormModel, BooleanRecordData>;
  emptyChipLabel: string;
} => ({
  chips: ({ formModel }) => {
    const { startDate, endDate } = intervalProvider(formModel);
    if (startDate || endDate) {
      return [
        {
          label: `${startDate ?? ""} - ${endDate ?? ""}`,
          value: "",
        },
      ];
    }
    return [];
  },
  onClickRemoveOnChip: ({ setFormModelFields }) => {
    startDateSetter(setFormModelFields, undefined);
    endDateSetter(setFormModelFields, undefined);
  },
  emptyChipLabel,
  renderEditor: ({ formModel, setFormModelFields }) => {
    const { startDate, endDate } = intervalProvider(formModel);
    return (
      <DateRangeCalendarSection
        startDate={startDate}
        endDate={endDate}
        setStartDate={(startDate) =>
          startDateSetter(setFormModelFields, format(startDate, "yyyy-MM-dd"))
        }
        setEndDate={(endDate) =>
          endDateSetter(setFormModelFields, format(endDate, "yyyy-MM-dd"))
        }
      />
    );
  },
});
