import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  BooleanRecord,
  BooleanRecordOptions,
} from "../section-factories/boolean-record/BooleanRecordTypes";
import { Card, CardHeader } from "@stenajs-webui/elements";
import { Indent, Row, useBoolean } from "@stenajs-webui/core";
import { SearchFilterButton } from "../components/SearchFilterButton";
import { useLocalSearchFilterState } from "../hooks/UseLocalSearchFilterState";
import { DateRangeCalendarSection } from "../section-factories/date-range/components/DateRangeCalendarSection";
import { format } from "date-fns";
import { SearchFilterDrawer } from "../components/SearchFilterDrawer";
import { SearchFilterChips } from "../features/chips/SearchFilterChips";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../components/SearchFilterSection";
import { SectionChips } from "../features/chips/SectionChips";
import {
  CheckboxSection,
  CheckboxSectionProps,
} from "../section-factories/boolean-record/checkboxes/SimpleCheckboxListSection";

export default {
  title: "filter/SearchFilterNew",
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

const fetchItemDivisionsForFilter = async (startDate: string | undefined) =>
  new Promise<BooleanRecordOptions>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { value: "1", label: "The one " + (startDate ?? "no date") },
          { value: "2", label: "Second" },
          { value: "3", label: "Threes" },
          { value: "4", label: "Quatro" },
        ]),
      1000
    )
  );

export const Demo = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >({ divisions: {} });

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
              <SearchFilterButton actions={actions} dispatch={dispatch} />
              <Indent num={0.5} />
              <SearchFilterChips actions={actions} dispatch={dispatch}>
                <SectionChips
                  sectionId={"comparisonDate"}
                  state={state}
                  actions={actions}
                  dispatch={dispatch}
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
                  state={state}
                  actions={actions}
                  dispatch={dispatch}
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
      <SearchFilterDrawer state={state} actions={actions} dispatch={dispatch}>
        <DateRangeCalendarSection
          sectionId={"comparisonDate"}
          state={state}
          actions={actions}
          dispatch={dispatch}
          value={state.formModel}
          setStartDate={(startDate) => {
            dispatch(
              actions.setFormModelFields({
                startDate: format(startDate, "yyyy-MM-dd"),
              })
            );
          }}
          setEndDate={(endDate) => {
            dispatch(
              actions.setFormModelFields({
                endDate: format(endDate, "yyyy-MM-dd"),
              })
            );
          }}
        />
        <DivisionSection
          sectionId={"divisions"}
          state={state}
          actions={actions}
          dispatch={dispatch}
          value={state.formModel.divisions}
          onValueChange={(divisions) => {
            console.log(divisions);
            dispatch(actions.setFormModelFields({ divisions }));
          }}
        />
        <ErrorSection
          sectionId={"error"}
          state={state}
          actions={actions}
          dispatch={dispatch}
        />
      </SearchFilterDrawer>
    </>
  );
};

type FilterSectionProps = SearchFilterSectionProps<
  SalesItemSearchFilterModel,
  SalesItemSearchFilterSectionKey
>;

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

const DivisionSection: React.VFC<
  CheckboxSectionProps<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >
> = ({ state, ...props }) => {
  const [loading, startLoading, stopLoading] = useBoolean(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<BooleanRecordOptions | undefined>(undefined);

  useEffect(() => {
    startLoading();
    fetchItemDivisionsForFilter(state.formModel.startDate)
      .then(setData)
      .catch(setError)
      .then(stopLoading);
  }, [startLoading, state.formModel.startDate, stopLoading]);

  return (
    <CheckboxSection
      {...props}
      state={state}
      loading={loading}
      error={error?.message}
      options={data}
    />
  );
};
