import * as React from "react";
import { useMemo, useState } from "react";
import { BooleanRecord } from "../section-factories/boolean-record/BooleanRecordTypes";
import { Card, CardHeader } from "@stenajs-webui/elements";
import { Indent, Row, useBoolean } from "@stenajs-webui/core";
import { SearchFilterButton } from "../components/SearchFilterButton";
import { useLocalSearchFilterState } from "../hooks/UseLocalSearchFilterState";
import { DateRangeCalendarSection } from "../section-factories/date-range/components/DateRangeCalendarSection";
import { SearchFilterDrawer } from "../components/SearchFilterDrawer";
import { SearchFilterChips } from "../features/chips/SearchFilterChips";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../components/SearchFilterSection";
import { SectionChips } from "../features/chips/SectionChips";
import { createSearchFilterInitialState } from "../redux/SearchFilterRedux";
import { createDateRangeSectionProps } from "../section-factories/date-range/DateRangePropsFactory";

export default {
  title: "filter/SearchFilter",
};

export interface SalesItemSearchFilterModel {
  startDate?: string;
  endDate?: string;
  divisions: Record<string, boolean>;
}

export type SalesItemSearchFilterSectionKey =
  | "comparisonDate"
  | "divisions"
  | "error";

export const Demo = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >(createSearchFilterInitialState({ divisions: {} }));

  const comparisonDateChips = useMemo(() => {
    const { startDate, endDate } = state.formModel;
    return startDate || endDate
      ? [
          {
            label: `${startDate ?? ""} - ${endDate ?? ""}`,
            value: "",
          },
        ]
      : [];
  }, [state]);

  const divisionChips = useMemo(() => {
    const record = state.formModel.divisions;
    const routes = Object.keys(record);
    return routes
      .filter((route) => record[route])
      .map((r) => ({ value: r, label: r }));
  }, [state]);

  return (
    <>
      <Card>
        <CardHeader
          text={"OSS pricing"}
          contentAfterHeading={
            <Row alignItems={"center"} indent spacing>
              <SearchFilterButton />
              <Indent num={0.5} />
              <SearchFilterChips>
                <SectionChips
                  sectionId={"comparisonDate"}
                  chips={comparisonDateChips}
                  emptyChipLabel={"No dates"}
                  onClickRemoveOnChip={() => {
                    dispatch(
                      actions.setFormModelFields({
                        startDate: undefined,
                        endDate: undefined,
                      })
                    );
                  }}
                />
                <SectionChips
                  sectionId={"divisions"}
                  chips={divisionChips}
                  emptyChipLabel={"All division"}
                  onClickRemoveOnChip={({ value }) => {
                    const newRecord: BooleanRecord = {
                      ...state.formModel.divisions,
                    };
                    delete newRecord[value];
                    dispatch(
                      actions.setFormModelFields({
                        divisions: newRecord,
                      })
                    );
                  }}
                />
              </SearchFilterChips>
            </Row>
          }
        />
      </Card>
      <SearchFilterDrawer>
        <DateRangeCalendarSection
          sectionId={"comparisonDate"}
          {...createDateRangeSectionProps(
            state.formModel,
            "startDate",
            "endDate"
          )}
        />
        <ErrorSection sectionId={"error"} />
      </SearchFilterDrawer>
    </>
  );
};

type FilterSectionProps = SearchFilterSectionProps<SalesItemSearchFilterSectionKey>;

const ErrorSection: React.VFC<FilterSectionProps> = (props) => {
  const [loading, startLoading, stopLoading] = useBoolean(false);
  const [error, setError] = useState<string | undefined>(
    "Something went wrong"
  );

  const onRetry = () => {
    setError(undefined);
    startLoading();
    setTimeout(() => {
      stopLoading();
      setError("Something else went wrong");
    }, 2000);
  };

  return (
    <SearchFilterSection
      {...props}
      loading={loading}
      error={error}
      onRetry={onRetry}
    />
  );
};
