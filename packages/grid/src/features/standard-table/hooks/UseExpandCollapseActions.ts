import {
  useStandardTableActions,
  useStandardTableState
} from "./UseStandardTableConfig";
import { useCallback } from "react";

export const useExpandCollapseActions = (entityId: string) => {
  const {
    actions: {
      expandedRows: { setEntityFields }
    },
    dispatch
  } = useStandardTableActions();
  const {
    expandedRows: { entities }
  } = useStandardTableState();

  const isExpanded = entities[entityId]?.expanded ?? false;

  const toggleRowExpanded = useCallback(() => {
    dispatch(setEntityFields(entityId, { expanded: !isExpanded }));
  }, [entityId, isExpanded, dispatch]);

  return {
    toggleRowExpanded,
    isExpanded
  };
};
