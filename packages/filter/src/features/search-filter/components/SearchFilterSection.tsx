import * as React from "react";
import { PropsWithChildren, useCallback } from "react";
import { Row, Space } from "@stenajs-webui/core";
import lowerCase from "lodash/lowerCase";
import upperFirst from "lodash/upperFirst";
import {
  Banner,
  FlatButton,
  MenuButton,
  Spinner,
} from "@stenajs-webui/elements";
import { useSearchFilterState } from "../context/SearchFilterStateContext";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface SearchFilterSectionProps<TSectionKey extends string> {
  sectionId: TSectionKey;
  label?: string;
  leftIcon?: IconDefinition;
  contentRight?: React.ReactNode;
  disableContentPadding?: boolean;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export const SearchFilterSection = function SearchFilterSection<
  TSectionKey extends string
>({
  sectionId,
  label,
  loading,
  error,
  onRetry,
  disableContentPadding,
  children,
  leftIcon,
  contentRight,
}: PropsWithChildren<SearchFilterSectionProps<TSectionKey>>) {
  const state = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const expanded = state.expandedSections.values[sectionId] ?? false;

  const onClickLabel = useCallback(() => {
    dispatch(actions.setSectionExpanded(sectionId, !expanded));
  }, [actions, dispatch, expanded, sectionId]);

  const activeLabel = label ?? formatColumnIdToHeaderCellLabel(sectionId);

  return (
    <>
      <MenuButton
        label={activeLabel}
        leftIcon={leftIcon}
        expandable
        expanded={expanded}
        selected={expanded}
        onClick={onClickLabel}
        right={contentRight}
      >
        {loading ? (
          <Row spacing justifyContent={"center"} flex={1}>
            <Spinner size={"small"} />
          </Row>
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
          children
        )}
      </MenuButton>
      {expanded && <Space />}
    </>
  );
};

export const formatColumnIdToHeaderCellLabel = (columnId: string): string =>
  upperFirst(lowerCase(columnId));
