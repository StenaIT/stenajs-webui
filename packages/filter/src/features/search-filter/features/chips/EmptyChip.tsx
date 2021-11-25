import * as React from "react";
import { ChipSpacer } from "./ChipSpacer";
import { Chip } from "@stenajs-webui/elements";
import { useCallback } from "react";
import { useSearchFilterDispatch } from "../../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../../context/SearchFilterActionsContext";

interface EmptyChipProps<TSectionKey extends string> {
  sectionId: TSectionKey;
  label: string;
}

export const EmptyChip = function EmptyChip<TSectionKey extends string>({
  label,
  sectionId,
}: EmptyChipProps<TSectionKey>) {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const onClickLabel = useCallback(() => {
    dispatch(actions.clearExpandedSections());
    dispatch(actions.expandSection(sectionId));
    dispatch(actions.openFilters());
  }, [actions, dispatch, sectionId]);

  return (
    <ChipSpacer>
      <Chip label={label} variant={"secondary"} onClick={onClickLabel} />
    </ChipSpacer>
  );
};
