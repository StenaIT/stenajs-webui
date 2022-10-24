import { Box, Heading, Indent, Row, useBoolean } from "@stenajs-webui/core";
import { Card, Tag } from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import { ClearFiltersButton } from "../components/ClearFiltersButton";
import { SearchFilterContext } from "../components/context/SearchFilterContext";
import { SearchFilterButton } from "../components/SearchFilterButton";
import { SearchFilterDrawer } from "../components/SearchFilterDrawer";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../components/SearchFilterSection";
import { StickySearchButton } from "../components/StickySearchButton";
import { SearchFilterChips } from "../features/chips/SearchFilterChips";
import { SectionChips } from "../features/chips/SectionChips";
import { useLocalSearchFilterState } from "../hooks/UseLocalSearchFilterState";
import { createSearchFilterInitialState } from "../redux/SearchFilterRedux";
import { createChipsPropsForBooleanRecord } from "../section-factories/boolean-record/BooleanRecordChips";
import { BooleanRecord } from "../section-factories/boolean-record/BooleanRecordTypes";
import { ChipMultiSelectSection } from "../section-factories/boolean-record/components/ChipMultiSelectSection";
import { SimpleCheckboxListSection } from "../section-factories/boolean-record/components/SimpleCheckboxListSection";
import { DateRangeCalendarSection } from "../section-factories/date-range/components/DateRangeCalendarSection";
import { createChipsPropsForDateRange } from "../section-factories/date-range/DateRangeChips";
import { createDateRangeSectionProps } from "../section-factories/date-range/DateRangePropsFactory";

export default {
  title: "filter/SearchFilter",
};

export interface SalesItemSearchFilterModel {
  startDate?: string;
  endDate?: string;
  divisions: BooleanRecord;
  categories: BooleanRecord;
}

export type SalesItemSearchFilterSectionKey =
  | "comparisonDate"
  | "divisions"
  | "error";

interface Division {
  id: string;
  description: string;
}

const divisionList: Array<Division> = [
  {
    id: "1BEVERAGE",
    description: "Beverage",
  },
  {
    id: "1CONFECT",
    description: "Confectionery/snacks",
  },
  {
    id: "1MISCELL",
    description: "Miscellaneous",
  },
  {
    id: "1PERFUME",
    description: "Perfume/cosmetics",
  },
  {
    id: "1PUBLICATO",
    description: "Publication",
  },
  {
    id: "1TOBACCO",
    description: "Tobacco",
  },
  {
    id: "2F",
    description: "Inventories",
  },
  {
    id: "2FOOD",
    description: "Food",
  },
  {
    id: "2PROVISION",
    description: "Provisions",
  },
  {
    id: "BINGO",
    description: "Bingo",
  },
  {
    id: "CABINONB",
    description: "Cabin sales onboard",
  },
  {
    id: "CABINRORO",
    description: "Cabin vouchers Roro",
  },
  {
    id: "CARPARK",
    description: "Car park",
  },
  {
    id: "CASINO",
    description: "Casino",
  },
  {
    id: "CHARITY",
    description: "Charity/donations",
  },
  {
    id: "CINEMA",
    description: "Cinema",
  },
  {
    id: "CONFERENCE",
    description: "Conference",
  },
  {
    id: "DEPOSIT",
    description: "Deposit",
  },
  {
    id: "EXCHANGE",
    description: "Exchange",
  },
  {
    id: "GAMEOTHER",
    description: "Gaming other",
  },
  {
    id: "GAMINGMACH",
    description: "Gaming machines",
  },
  {
    id: "GUESTSERV",
    description: "Guest service",
  },
  {
    id: "LOCKERS",
    description: "Lockers",
  },
  {
    id: "MEALRORO",
    description: "Roro meal vouchers income",
  },
  {
    id: "OTHER",
    description: "Other",
  },
  {
    id: "PHONE",
    description: "Telephone income",
  },
  {
    id: "RECLSEAT",
    description: "Reclining seat sales onboard",
  },
  {
    id: "SEATPREBOO",
    description: "Stena Plus Prebooked Seats",
  },
  {
    id: "SPA",
    description: "Spa Treatments",
  },
  {
    id: "SUPERNUMER",
    description: "Supernumerary",
  },
  {
    id: "THIRDPARTY",
    description: "Third party income",
  },
  {
    id: "TRAIN",
    description: "Train ticket sales",
  },
  {
    id: "TVGAMES",
    description: "TV Games",
  },
  {
    id: "VENDING",
    description: "Vending machines",
  },
  {
    id: "WARDROBE",
    description: "Wardrobe",
  },
  {
    id: "WIFI",
    description: "WiFi",
  },
];

interface ItemCategory {
  id: string;
  description: string;
}

const categoryList: Array<ItemCategory> = [
  {
    id: "ALACARTE",
    description: "A la Carte",
  },
  {
    id: "ALCOPOP",
    description: "Alcopops",
  },
  {
    id: "ATTRACT",
    description: "Attractions",
  },
  {
    id: "BAGS",
    description: "Handbags/suitcases/wallets",
  },
  {
    id: "BEER",
    description: "Beer",
  },
  {
    id: "BEVERGWP",
    description: "Beverage GWP",
  },
  {
    id: "BINGO",
    description: "Bingo",
  },
  {
    id: "BOOKS",
    description: "Books",
  },
  {
    id: "BREAKFAST",
    description: "Breakfast",
  },
  {
    id: "BUFFET",
    description: "Buffet",
  },
  {
    id: "CABIN",
    description: "Cabin sales onboard",
  },
  {
    id: "CABINRORO",
    description: "Cabin vouchers Roro",
  },
  {
    id: "CARPARK",
    description: "Car park",
  },
  {
    id: "CASINO",
    description: "Casino",
  },
  {
    id: "CHINA",
    description: "China/Porcelain/Glass",
  },
  {
    id: "CIDER",
    description: "Cider",
  },
  {
    id: "CIGARETTES",
    description: "Cigarettes",
  },
  {
    id: "CIGARS",
    description: "Cigars",
  },
  {
    id: "CINEMA",
    description: "Cinema",
  },
  {
    id: "CLEANING",
    description: "Cleaning",
  },
  {
    id: "CLOCKS",
    description: "Watches/Clocks",
  },
  {
    id: "COLDDISH",
    description: "Cold Dishes",
  },
  {
    id: "CONFECGIFT",
    description: "Confectionery with gifts",
  },
  {
    id: "CONFECT",
    description: "Confectionery",
  },
];

const divisionOptions = divisionList?.map((p) => ({
  value: p.id,
  label: p.description,
}));

const categoryOptions = categoryList?.map((p) => ({
  value: p.id,
  label: p.description,
}));

export const Demo = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >(createSearchFilterInitialState({ divisions: {}, categories: {} }));

  const selectedCategories = Object.values(state.formModel.categories).filter(
    (value) => value
  ).length;

  const selectedDivisions = Object.values(state.formModel.divisions).filter(
    (value) => value
  ).length;

  return (
    <SearchFilterContext state={state} actions={actions} dispatch={dispatch}>
      <Card>
        <Row
          alignItems={"center"}
          justifyContent={"space-between"}
          indent={2}
          spacing
          minHeight={"56px"}
        >
          <Row alignItems={"center"}>
            <Heading style={{ whiteSpace: "nowrap" }}>App name</Heading>
            <Indent />
            <SearchFilterButton />
            <Indent num={0.5} />
            <SearchFilterChips>
              <SectionChips
                sectionId={"comparisonDate"}
                emptyChipLabel={"No dates"}
                {...createChipsPropsForDateRange(
                  state.formModel,
                  "startDate",
                  "endDate"
                )}
              />
              <SectionChips
                sectionId={"divisions"}
                emptyChipLabel={"All divisions"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "divisions",
                  divisionOptions
                )}
              />
              <SectionChips
                sectionId={"categories"}
                emptyChipLabel={"All categories"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "categories",
                  categoryOptions
                )}
              />
            </SearchFilterChips>
          </Row>
        </Row>
      </Card>
      <SearchFilterDrawer>
        <DateRangeCalendarSection
          contentRight={
            state.formModel.startDate &&
            state.formModel.endDate && (
              <Tag
                label={`${state.formModel.startDate} - ${state.formModel.endDate}`}
              />
            )
          }
          sectionId={"comparisonDate"}
          {...createDateRangeSectionProps(
            state.formModel,
            "startDate",
            "endDate"
          )}
        />
        <ChipMultiSelectSection
          contentRight={
            selectedDivisions > 0 && (
              <Tag label={selectedDivisions.toString()} />
            )
          }
          sectionId={"divisions"}
          loading={false}
          noneSelectedLabel={"All divisions"}
          options={divisionOptions}
          value={state.formModel.divisions}
          onValueChange={(divisions) =>
            dispatch(actions.setFormModelFields({ divisions }))
          }
        />
        <SimpleCheckboxListSection
          contentRight={
            selectedCategories > 0 && (
              <Tag label={selectedCategories.toString()} />
            )
          }
          sectionId={"categories"}
          options={categoryOptions}
          value={state.formModel.categories}
          onValueChange={(categories) =>
            dispatch(actions.setFormModelFields({ categories }))
          }
        />

        <ErrorSection sectionId={"error"} />
        <SearchFilterSection sectionId={"loading"} loading />
      </SearchFilterDrawer>
    </SearchFilterContext>
  );
};

export const WithStickySearchButton = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >(createSearchFilterInitialState({ divisions: {}, categories: {} }));

  const selectedCategories = Object.values(state.formModel.categories).filter(
    (value) => value
  ).length;

  const selectedDivisions = Object.values(state.formModel.divisions).filter(
    (value) => value
  ).length;

  return (
    <SearchFilterContext state={state} actions={actions} dispatch={dispatch}>
      <Card>
        <Row
          alignItems={"center"}
          justifyContent={"space-between"}
          indent={2}
          spacing
          minHeight={"56px"}
        >
          <Row alignItems={"center"}>
            <Heading style={{ whiteSpace: "nowrap" }}>App name</Heading>
            <Indent />
            <SearchFilterButton />
            <Indent num={0.5} />
            <SearchFilterChips>
              <SectionChips
                sectionId={"comparisonDate"}
                emptyChipLabel={"No dates"}
                {...createChipsPropsForDateRange(
                  state.formModel,
                  "startDate",
                  "endDate"
                )}
              />
              <SectionChips
                sectionId={"divisions"}
                emptyChipLabel={"All divisions"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "divisions",
                  divisionOptions
                )}
              />
              <SectionChips
                sectionId={"categories"}
                emptyChipLabel={"All categories"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "categories",
                  categoryOptions
                )}
              />
            </SearchFilterChips>
          </Row>
        </Row>
      </Card>
      <SearchFilterDrawer>
        <Box overflow={"auto"}>
          <DateRangeCalendarSection
            contentRight={
              state.formModel.startDate &&
              state.formModel.endDate && (
                <Tag
                  label={`${state.formModel.startDate} - ${state.formModel.endDate}`}
                />
              )
            }
            sectionId={"comparisonDate"}
            {...createDateRangeSectionProps(
              state.formModel,
              "startDate",
              "endDate"
            )}
          />
          <ChipMultiSelectSection
            contentRight={
              selectedDivisions > 0 && (
                <Tag label={selectedDivisions.toString()} />
              )
            }
            sectionId={"divisions"}
            loading={false}
            noneSelectedLabel={"All divisions"}
            options={divisionOptions}
            value={state.formModel.divisions}
            onValueChange={(divisions) =>
              dispatch(actions.setFormModelFields({ divisions }))
            }
          />
          <SimpleCheckboxListSection
            contentRight={
              selectedCategories > 0 && (
                <Tag label={selectedCategories.toString()} />
              )
            }
            sectionId={"categories"}
            options={categoryOptions}
            value={state.formModel.categories}
            onValueChange={(categories) =>
              dispatch(actions.setFormModelFields({ categories }))
            }
          />

          <ErrorSection sectionId={"error"} />
          <SearchFilterSection sectionId={"loading"} loading />
        </Box>
        <StickySearchButton label={"Search"} />
      </SearchFilterDrawer>
    </SearchFilterContext>
  );
};

export const WithClearFiltersInHeader = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >(createSearchFilterInitialState({ divisions: {}, categories: {} }));

  const selectedCategories = Object.values(state.formModel.categories).filter(
    (value) => value
  ).length;

  const selectedDivisions = Object.values(state.formModel.divisions).filter(
    (value) => value
  ).length;

  return (
    <SearchFilterContext state={state} actions={actions} dispatch={dispatch}>
      <Card>
        <Row
          alignItems={"center"}
          justifyContent={"space-between"}
          indent={2}
          spacing
          minHeight={"56px"}
        >
          <Row alignItems={"center"}>
            <Heading style={{ whiteSpace: "nowrap" }}>App name</Heading>
            <Indent />
            <SearchFilterButton />
            <Indent num={0.5} />
            <SearchFilterChips>
              <SectionChips
                sectionId={"comparisonDate"}
                emptyChipLabel={"No dates"}
                {...createChipsPropsForDateRange(
                  state.formModel,
                  "startDate",
                  "endDate"
                )}
              />
              <SectionChips
                sectionId={"divisions"}
                emptyChipLabel={"All divisions"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "divisions",
                  divisionOptions
                )}
              />
              <SectionChips
                sectionId={"categories"}
                emptyChipLabel={"All categories"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "categories",
                  categoryOptions
                )}
              />
            </SearchFilterChips>
          </Row>
        </Row>
      </Card>
      <SearchFilterDrawer headerContentRight={<ClearFiltersButton />}>
        <DateRangeCalendarSection
          contentRight={
            state.formModel.startDate &&
            state.formModel.endDate && (
              <Tag
                label={`${state.formModel.startDate} - ${state.formModel.endDate}`}
              />
            )
          }
          sectionId={"comparisonDate"}
          {...createDateRangeSectionProps(
            state.formModel,
            "startDate",
            "endDate"
          )}
        />
        <ChipMultiSelectSection
          contentRight={
            selectedDivisions > 0 && (
              <Tag label={selectedDivisions.toString()} />
            )
          }
          sectionId={"divisions"}
          loading={false}
          noneSelectedLabel={"All divisions"}
          options={divisionOptions}
          value={state.formModel.divisions}
          onValueChange={(divisions) =>
            dispatch(actions.setFormModelFields({ divisions }))
          }
        />
        <SimpleCheckboxListSection
          contentRight={
            selectedCategories > 0 && (
              <Tag label={selectedCategories.toString()} />
            )
          }
          sectionId={"categories"}
          options={categoryOptions}
          value={state.formModel.categories}
          onValueChange={(categories) =>
            dispatch(actions.setFormModelFields({ categories }))
          }
        />

        <ErrorSection sectionId={"error"} />
        <SearchFilterSection sectionId={"loading"} loading />
      </SearchFilterDrawer>
    </SearchFilterContext>
  );
};

type FilterSectionProps =
  SearchFilterSectionProps<SalesItemSearchFilterSectionKey>;

const ErrorSection: React.FC<FilterSectionProps> = (props) => {
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

export const ManyChips = () => {
  const { dispatch, actions, state } = useLocalSearchFilterState<
    SalesItemSearchFilterModel,
    SalesItemSearchFilterSectionKey
  >(createSearchFilterInitialState({ divisions: {}, categories: {} }));

  return (
    <SearchFilterContext state={state} actions={actions} dispatch={dispatch}>
      <Card>
        <Row
          alignItems={"center"}
          justifyContent={"space-between"}
          indent={2}
          spacing
          minHeight={"56px"}
        >
          <Row alignItems={"center"}>
            <Heading style={{ whiteSpace: "nowrap" }}>App name</Heading>
            <Indent />
            <SearchFilterButton />
            <Indent num={0.5} />
            <SearchFilterChips>
              <SectionChips
                sectionId={"divisions"}
                emptyChipLabel={"All divisions"}
                {...createChipsPropsForBooleanRecord(
                  state.formModel,
                  "divisions",
                  divisionOptions
                )}
                chips={divisionOptions}
              />
            </SearchFilterChips>
          </Row>
        </Row>
      </Card>
      <SearchFilterDrawer>
        <ChipMultiSelectSection
          sectionId={"divisions"}
          loading={false}
          options={divisionOptions}
          noneSelectedLabel={"All divisions"}
          value={state.formModel.divisions}
          onValueChange={(divisions) =>
            dispatch(actions.setFormModelFields({ divisions }))
          }
        />
        <ErrorSection sectionId={"error"} />
        <SearchFilterSection sectionId={"loading"} loading />
      </SearchFilterDrawer>
    </SearchFilterContext>
  );
};
