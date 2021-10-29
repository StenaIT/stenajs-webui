import { ReactNode } from "react";

export interface SearchFilterConfig<TFormModel, TSectionKey extends string> {
  sections: Record<TSectionKey, SearchFilterSectionConfig<TFormModel, any>>;
  sectionOrder: Array<TSectionKey>;
}

export interface SearchFilterSectionChipModel {
  value: string;
  label: string;
}

export interface SearchFilterSectionConfig<TFormModel, TData> {
  label?: string;
  fetcher?: (formModel: TFormModel) => Promise<TData>;
  renderEditor?: SearchFilterSectionRender<TFormModel, TData>;
  renderLeft?: SearchFilterSectionRender<TFormModel, TData>;
  renderRight?: SearchFilterSectionRender<TFormModel, TData>;
  chips?: SearchFilterSectionChips<TFormModel>;
  emptyChipLabel?: string;
  onClickRemoveOnChip?: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
  showEditorWhileLoading?: boolean;
}

export type SearchFilterSectionRender<TFormModel, TData> = (
  arg: RenderEditorArg<TFormModel, TData>
) => ReactNode;

export type SearchFilterSectionOnClickRemoveOnChip<TFormModel> = (
  arg: OnClickRemoveOnChipArg<TFormModel>
) => void;

export type SearchFilterSectionChips<TFormModel> = (
  arg: ChipsArg<TFormModel>
) => Array<SearchFilterSectionChipModel>;

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
export interface RenderEditorArg<TFormModel, TData> {
  formModel: TFormModel;
  setFormModelFields: (fields: Partial<TFormModel>) => void;
  data?: TData;
  loading: boolean;
  error?: Error;
}

export const createSectionConfig = <TFormModel, TData>(
  config: SearchFilterSectionConfig<TFormModel, TData>
) => config;
