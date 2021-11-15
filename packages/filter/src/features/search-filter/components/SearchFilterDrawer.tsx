import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../redux/SearchFilterRedux";
import * as React from "react";
import { Dispatch, useCallback } from "react";
import { Drawer, DrawerProps } from "@stenajs-webui/modal";
import { cssColor } from "@stenajs-webui/theme";
import { Column } from "@stenajs-webui/core";
import { SearchFilterPanelHeader } from "./SearchFilterPanelHeader";

interface SearchFilterDrawerProps<TFormModel, TSectionKey extends string>
  extends Omit<DrawerProps, "isOpen" | "onRequestClose"> {
  state: SearchFilterState<TFormModel>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
}
export const SearchFilterDrawer = function SearchFilterDrawer<
  TFormModel,
  TSectionKey extends string
>({
  config,
  state,
  dispatch,
  actions,
  children,
  ...drawerProps
}: SearchFilterDrawerProps<TFormModel, TSectionKey>) {
  const { open } = state.settings;
  const closeDrawer = useCallback(() => {
    dispatch(actions.closeFilters());
  }, [actions, dispatch]);

  return (
    <Drawer
      background={cssColor("--lhds-color-ui-50")}
      width={"370px"}
      isOpen={open}
      onRequestClose={closeDrawer}
      {...drawerProps}
    >
      <Column>
        <SearchFilterPanelHeader onRequestClose={closeDrawer} />
        {children}
      </Column>
    </Drawer>
  );
};
