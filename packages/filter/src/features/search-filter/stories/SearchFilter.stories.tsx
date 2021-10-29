import * as React from "react";
import {
  createSectionConfig,
  SearchFilterConfig,
} from "../config/SearchFilterConfig";
import { createDateRangeSection } from "../section-factories/date-range/DateRangeSectionFactory";
import { BooleanRecordData } from "../section-factories/boolean-record/BooleanRecordTypes";
import { createSimpleCheckboxListSection } from "../section-factories/boolean-record/checkboxes/SimpleCheckboxListSectionFactory";
import { Card, CardHeader } from "@stenajs-webui/elements";
import { Indent, Row } from "@stenajs-webui/core";
import { SearchFilterDrawer } from "../components/SearchFilterDrawer";
import { SearchFilterChips } from "../features/chips/SearchFilterChips";
import { SearchFilterButton } from "../components/SearchFilterButton";
import { useLocalSearchFilterState } from "../hooks/UseLocalSearchFilterState";

export default {
  title: "panels/SearchFilter",
};

export interface SalesItemSearchFilterModel {
  startDate?: string;
  endDate?: string;
  divisions: Record<string, boolean>;
}

export type SalesItemSearchFilterSectionKey = "comparisonDate" | "divisions";

const fetchItemDivisionsForFilter = async () =>
  new Promise<BooleanRecordData>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "1", label: "The one" },
          { id: "2", label: "Second" },
          { id: "3", label: "Threes" },
          { id: "4", label: "Quatro" },
        ]),
      1000
    )
  );

export const salesItemSearchFilterConfig: SearchFilterConfig<
  SalesItemSearchFilterModel,
  SalesItemSearchFilterSectionKey
> = {
  sections: {
    comparisonDate: createSectionConfig(
      createDateRangeSection<SalesItemSearchFilterModel>(
        (m) => m,
        (setFormModelFields, startDate) => setFormModelFields({ startDate }),
        (setFormModelFields, endDate) => setFormModelFields({ endDate })
      )
    ),
    divisions: createSectionConfig<
      SalesItemSearchFilterModel,
      BooleanRecordData
    >({
      emptyChipLabel: "All division",
      fetcher: fetchItemDivisionsForFilter,
      ...createSimpleCheckboxListSection(
        (m) => m.divisions,
        (setFormModelFields, divisions) => setFormModelFields({ divisions })
      ),
    }),
  },
  sectionOrder: ["comparisonDate", "divisions"],
};

export const Demo = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >({ divisions: {} });

  return (
    <Card>
      <CardHeader
        text={"OSS pricing"}
        contentAfterHeading={
          <Row alignItems={"center"} indent spacing>
            <SearchFilterButton actions={actions} dispatch={dispatch} />
            <SearchFilterDrawer
              config={salesItemSearchFilterConfig}
              state={state}
              actions={actions}
              dispatch={dispatch}
            />
            <Indent num={0.5} />
            <SearchFilterChips
              config={salesItemSearchFilterConfig}
              state={state}
              actions={actions}
              dispatch={dispatch}
            />
          </Row>
        }
      />
    </Card>
  );
};
