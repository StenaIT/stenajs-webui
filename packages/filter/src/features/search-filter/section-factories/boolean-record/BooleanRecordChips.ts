import { BooleanRecord, BooleanRecordOptions } from "./BooleanRecordTypes";
import {
  SearchFilterSectionChipModel,
  SearchFilterSectionOnClickRemoveOnChip,
} from "../../config/SearchFilterConfig";
import { PickByValue, truthyKeysAsList } from "@stenajs-webui/core";
import { SectionChipsProps } from "../../features/chips/SectionChips";

export const createChipsPropsForBooleanRecord = <
  TFormModel,
  TSectionKey extends string,
  TField extends keyof PickByValue<TFormModel, BooleanRecord>,
>(
  formModel: TFormModel,
  fieldName: TField,
  options?: BooleanRecordOptions,
): Pick<
  SectionChipsProps<TFormModel, TSectionKey>,
  "chips" | "onClickRemoveOnChip"
> => ({
  chips: createChipsForBooleanRecord(
    formModel[fieldName] as unknown as BooleanRecord,
    options,
  ),
  onClickRemoveOnChip: createOnClickRemoveOnChipForBooleanRecord(
    formModel,
    fieldName,
  ),
});

export const createChipsForBooleanRecord = (
  booleanRecord: BooleanRecord,
  options?: BooleanRecordOptions,
): Array<SearchFilterSectionChipModel> =>
  truthyKeysAsList(booleanRecord).map((key) => {
    const option = options?.find((o) => o.value === key);
    return { value: key, label: option?.label ?? key };
  });

export const createOnClickRemoveOnChipForBooleanRecord = <
  TFormModel,
  TField extends keyof PickByValue<TFormModel, BooleanRecord>,
>(
  formModel: TFormModel,
  fieldName: TField,
): SearchFilterSectionOnClickRemoveOnChip<TFormModel> => {
  return ({ setFormModelFields, value }) => {
    const newBooleanRecord = { ...formModel[fieldName] } as BooleanRecord;
    newBooleanRecord[value] = false;
    setFormModelFields({
      [fieldName]: newBooleanRecord,
    } as unknown as Partial<TFormModel>);
  };
};
