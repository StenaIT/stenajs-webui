import * as React from "react";
import { Dispatch, PropsWithChildren, useCallback } from "react";
import { Row } from "@stenajs-webui/core";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../redux/SearchFilterRedux";
import { Collapsible, CollapsibleContent } from "@stenajs-webui/panels";
import { lowerCase, upperFirst } from "lodash";
import { Banner, FlatButton, Spinner } from "@stenajs-webui/elements";

export interface SearchFilterSectionProps<
  TFormModel,
  TSectionKey extends string
> {
  sectionId: TSectionKey;
  state: SearchFilterState<TFormModel>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  disableContentPadding?: boolean;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  label?: string;
}

export const SearchFilterSection = function SearchFilterSection<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  label,
  contentLeft,
  contentRight,
  state,
  dispatch,
  actions,
  loading,
  error,
  onRetry,
  disableContentPadding,
  children,
}: PropsWithChildren<SearchFilterSectionProps<TFormModel, TSectionKey>>) {
  const expanded = state.expandedSections.values[sectionId] ?? false;

  const onClickLabel = useCallback(() => {
    dispatch(actions.setSectionExpanded(sectionId, !expanded));
  }, [actions, dispatch, expanded, sectionId]);

  const activeLabel = label ?? formatColumnIdToHeaderCellLabel(sectionId);

  return (
    <Collapsible
      label={activeLabel}
      collapsed={!expanded}
      onClick={onClickLabel}
      contentLeft={contentLeft}
      contentRight={contentRight}
    >
      {loading ? (
        <CollapsibleContent>
          <Row spacing justifyContent={"center"} flex={1}>
            <Spinner size={"small"} />
          </Row>
        </CollapsibleContent>
      ) : error ? (
        <Banner
          variant={"error"}
          text={error}
          contentRight={
            onRetry ? <FlatButton label={"Retry"} onClick={onRetry} /> : null
          }
        />
      ) : disableContentPadding ? (
        children
      ) : (
        <CollapsibleContent>{children}</CollapsibleContent>
      )}
    </Collapsible>
  );
};

export const formatColumnIdToHeaderCellLabel = (columnId: string): string =>
  upperFirst(lowerCase(columnId));
