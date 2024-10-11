export interface SearchFilterSectionChipModel {
  value: string;
  label: string;
}

export type SearchFilterSectionOnClickRemoveOnChip<TFormModel> = (
  arg: OnClickRemoveOnChipArg<TFormModel>,
) => void;

export interface ChipsArg<TSearchFilterModel> {
  formModel: TSearchFilterModel;
}

export type FormFieldsSetter<TFormModel> = (
  fields: Partial<TFormModel>,
) => void;

export interface OnClickRemoveOnChipArg<TFormModel> {
  value: string;
  setFormModelFields: FormFieldsSetter<TFormModel>;
}
