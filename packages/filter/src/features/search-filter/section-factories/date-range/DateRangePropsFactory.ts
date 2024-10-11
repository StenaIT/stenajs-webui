import { PickByValue } from "@stenajs-webui/core";
import { DateRangeCalendarSectionProps } from "./components/DateRangeCalendarSection";

export const createDateRangeSectionProps = <
  TFormModel,
  TField extends keyof PickByValue<TFormModel, string | undefined>,
  TSectionKey extends string,
>(
  formModel: TFormModel,
  startDateFieldName: TField,
  endDateFieldName: TField,
): Pick<
  DateRangeCalendarSectionProps<TFormModel, TSectionKey>,
  "value" | "onValueChange"
> => ({
  value: {
    startDate: formModel[startDateFieldName] as unknown as string | undefined,
    endDate: formModel[endDateFieldName] as unknown as string | undefined,
  },
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onValueChange: (value, { dispatch, actions }) => {
    const fields: Partial<TFormModel> = {
      [startDateFieldName]: value.startDate,
      [endDateFieldName]: value.endDate,
    } as any;
    dispatch(actions.setFormModelFields(fields));
  },
});
