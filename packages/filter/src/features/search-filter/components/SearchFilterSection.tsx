import * as React from "react";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { SearchFilterConfig } from "../config/SearchFilterConfig";
import { Column, Row, useBoolean } from "@stenajs-webui/core";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../redux/SearchFilterRedux";
import { Collapsible, CollapsibleContent } from "@stenajs-webui/panels";
import { lowerCase, upperFirst } from "lodash";
import { Spinner } from "@stenajs-webui/elements";

interface SearchFilterSectionProps<TFormModel, TSectionKey extends string> {
  sectionId: TSectionKey;
  config: SearchFilterConfig<TFormModel, TSectionKey>;
  state: SearchFilterState<TFormModel>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
}

export const SearchFilterSection = function SearchFilterSection<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  config,
  state,
  dispatch,
  actions,
}: SearchFilterSectionProps<TFormModel, TSectionKey>) {
  const expanded = state.expandedSections.values[sectionId] ?? false;
  const {
    fetcher,
    renderEditor,
    renderLeft,
    renderRight,
    label,
    showEditorWhileLoading,
  } = config.sections[sectionId];
  const [loading, startLoading, stopLoading] = useBoolean(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<unknown>(null);

  const onClickLabel = useCallback(() => {
    dispatch(actions.setSectionExpanded(sectionId, !expanded));
  }, [actions, dispatch, expanded, sectionId]);

  useEffect(() => {
    if (fetcher) {
      startLoading();
      setError(undefined);
      fetcher(state.formModel)
        .then(setData)
        .catch(setError)
        .finally(stopLoading);
    }
    // TODO Should only refetch when form model fields used by fetcher has been changed.
  }, [fetcher, startLoading, state.formModel, stopLoading]);

  const setFormModelFields = useCallback(
    (fields: Partial<TFormModel>) =>
      dispatch(actions.setFormModelFields(fields)),
    [dispatch, actions]
  );

  const activeLabel = label ?? formatColumnIdToHeaderCellLabel(sectionId);

  const showEditor = !loading || showEditorWhileLoading;
  const showLoading = loading && !showEditorWhileLoading;

  const renderArgs = {
    formModel: state.formModel,
    setFormModelFields,
    data,
    loading,
    error,
  };

  return (
    <Column>
      <Collapsible
        label={activeLabel}
        collapsed={!expanded}
        onClick={onClickLabel}
        contentLeft={renderLeft?.(renderArgs)}
        contentRight={renderRight?.(renderArgs)}
      >
        <CollapsibleContent>
          {showLoading && (
            <Row spacing justifyContent={"center"} flex={1}>
              <Spinner size={"small"} />
            </Row>
          )}
          {showEditor && renderEditor?.(renderArgs)}
        </CollapsibleContent>
      </Collapsible>
    </Column>
  );
};

export const formatColumnIdToHeaderCellLabel = (columnId: string): string =>
  upperFirst(lowerCase(columnId));
