export interface SearchFilterSectionChipModel {
  value: string;
  label: string;
}

export type SearchFilterSectionOnClickRemoveOnChip<TFormModel> = (
  arg: OnClickRemoveOnChipArg<TFormModel>
) => void;

export interface ChipsArg<TSearchFilterModel> {
  formModel: TSearchFilterModel;
}

export type SetFormModelFields<TFormModel> = (
  fields: Partial<TFormModel>
) => void;

export interface OnClickRemoveOnChipArg<TFormModel> {
  value: string;
  formModel: TFormModel;
  setFormModelFields: SetFormModelFields<TFormModel>;
}
