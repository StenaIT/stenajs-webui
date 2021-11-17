import { PickByValue } from "@stenajs-webui/core";
import { DateRangeCalendarSectionProps } from "./components/DateRangeCalendarSection";

export const createDateRangeSectionProps = <
  TFormModel,
  TField extends keyof PickByValue<TFormModel, string | undefined>,
  TSectionKey extends string
>(
  formModel: TFormModel,
  startDateFieldName: TField,
  endDateFieldName: TField
): Pick<
  DateRangeCalendarSectionProps<TFormModel, TSectionKey>,
  "value" | "onValueChange"
> => ({
  value: {
    startDate: formModel[startDateFieldName],
    endDate: formModel[endDateFieldName],
  },
  onValueChange: (value, { dispatch, actions }) => {
    const fields: Partial<TFormModel> = {
      [startDateFieldName]: value.startDate,
      [endDateFieldName]: value.endDate,
    } as any;
    dispatch(actions.setFormModelFields(fields));
  },
});
