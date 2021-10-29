import { combineReducers } from "redux";
import {
  createEntityActions,
  createEntityReducer,
  createValueByIdActions,
  createValueByIdReducer,
  EntityAction,
  EntityState,
  reducerIdGate,
  reducerIdGateAction,
  ReducerIdGateAction,
  ValueByIdAction,
  ValueByIdState,
} from "@stenajs-webui/redux";

export interface SearchFilterSettings {
  open: boolean;
}

export interface SearchFilterState<TFormModel> {
  expandedSections: ValueByIdState<boolean>;
  formModel: EntityState<TFormModel>;
  settings: EntityState<SearchFilterSettings>;
}

export type SearchFilterAction<TFormModel> =
  | ReducerIdGateAction<ValueByIdAction<boolean>>
  | ReducerIdGateAction<EntityAction<TFormModel>>
  | ReducerIdGateAction<EntityAction<SearchFilterSettings>>;

export const createSearchFilterReducer = <TFormModel>(
  reducerId: string,
  initialFormModel: TFormModel
) =>
  combineReducers({
    expandedSections: reducerIdGate(
      getReducerIdFor(reducerId, "expandedSections"),
      createValueByIdReducer<boolean>()
    ),
    formModel: reducerIdGate(
      getReducerIdFor(reducerId, "formModel"),
      createEntityReducer<TFormModel>(initialFormModel)
    ),
    settings: reducerIdGate(
      getReducerIdFor(reducerId, "settings"),
      createEntityReducer<SearchFilterSettings>({ open: false })
    ),
  });

export interface SearchFilterActions<TFormModel, TSectionKey extends string> {
  openFilters: () => SearchFilterAction<TFormModel>;
  closeFilters: () => SearchFilterAction<TFormModel>;
  setFormModelFields: (
    fields: Partial<TFormModel>
  ) => SearchFilterAction<TFormModel>;
  clearFormModel: () => SearchFilterAction<TFormModel>;
  expandSection: (section: TSectionKey) => SearchFilterAction<TFormModel>;
  collapseSection: (section: TSectionKey) => SearchFilterAction<TFormModel>;
  setSectionExpanded: (
    section: TSectionKey,
    expanded: boolean
  ) => SearchFilterAction<TFormModel>;
  clearExpandedSections: () => SearchFilterAction<TFormModel>;
}

export const createSearchFilterActions = <
  TFormModel,
  TSectionKey extends string
>(
  reducerId: string,
  initialFormModel: TFormModel
): SearchFilterActions<TFormModel, TSectionKey> => ({
  openFilters: () =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "settings"),
      createEntityActions<SearchFilterSettings>().setEntityFields({
        open: true,
      })
    ),
  closeFilters: () =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "settings"),
      createEntityActions<SearchFilterSettings>().setEntityFields({
        open: false,
      })
    ),
  setFormModelFields: (fields: Partial<TFormModel>) =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "formModel"),
      createEntityActions<TFormModel>().setEntityFields(fields)
    ),
  clearFormModel: () =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "formModel"),
      createEntityActions<TFormModel>().setEntity(initialFormModel)
    ),
  expandSection: (section: TSectionKey) =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "expandedSections"),
      createValueByIdActions<boolean>().setValue(section, true)
    ),
  collapseSection: (section: TSectionKey) =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "expandedSections"),
      createValueByIdActions<boolean>().setValue(section, false)
    ),
  setSectionExpanded: (section: TSectionKey, expanded: boolean) =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "expandedSections"),
      createValueByIdActions<boolean>().setValue(section, expanded)
    ),
  clearExpandedSections: () =>
    reducerIdGateAction(
      getReducerIdFor(reducerId, "expandedSections"),
      createValueByIdActions<boolean>().clearAllValues()
    ),
});

export const getReducerIdFor = (
  reducerId: string,
  reducerIdSuffix: keyof SearchFilterState<unknown>
): string => `${reducerId}.${reducerIdSuffix}`;
