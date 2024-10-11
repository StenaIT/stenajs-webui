import {
  SearchFilterSectionChipModel,
  SearchFilterSectionOnClickRemoveOnChip,
} from "../../config/SearchFilterConfig";
import { PickByValue } from "@stenajs-webui/core";
import { SectionChipsProps } from "../../features/chips/SectionChips";

export const createChipsPropsForDateRange = <
  TFormModel,
  TSectionKey extends string,
  TField extends keyof PickByValue<TFormModel, string | undefined>,
>(
  formModel: TFormModel,
  startDateFieldName: TField,
  endDateFieldName: TField,
): Pick<
  SectionChipsProps<TFormModel, TSectionKey>,
  "chips" | "onClickRemoveOnChip"
> => ({
  chips: createChipsForDateRange(
    formModel[startDateFieldName] as unknown as string | undefined,
    formModel[endDateFieldName] as unknown as string | undefined,
  ),
  onClickRemoveOnChip: createOnClickRemoveOnChipForDateRange(
    startDateFieldName,
    endDateFieldName,
  ),
});

export const createChipsForDateRange = (
  startDate: string | undefined,
  endDate: string | undefined,
): Array<SearchFilterSectionChipModel> => {
  if (!startDate && !endDate) {
    return [];
  }
  return [
    { value: "dateRange", label: `${startDate ?? ""} - ${endDate ?? ""}` },
  ];
};

export const createOnClickRemoveOnChipForDateRange = <
  TFormModel,
  TField extends keyof PickByValue<TFormModel, string | undefined>,
>(
  startDateFieldName: TField,
  endDateFieldName: TField,
): SearchFilterSectionOnClickRemoveOnChip<TFormModel> => {
  return ({ setFormModelFields }) => {
    setFormModelFields({
      [startDateFieldName]: undefined,
      [endDateFieldName]: undefined,
    } as unknown as Partial<TFormModel>);
  };
};
