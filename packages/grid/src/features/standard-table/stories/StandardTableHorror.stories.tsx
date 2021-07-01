import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Box, Indent, Space, Text } from "@stenajs-webui/core";
import { Chip, FlatButton, Icon, Tag } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import { Popover } from "@stenajs-webui/tooltip";
import { format, parseISO } from "date-fns";
import { round } from "lodash";
import * as React from "react";
import { StandardTable } from "../components/StandardTable";
import { createColumnConfig } from "../config/StandardTableColumnConfig";
import { StandardTableConfig } from "../config/StandardTableConfig";

export default {
  title: "grid/StandardTable/Horror",
};

export interface SalesPerformanceTableRowItem {
  info: any;
  pricingPath: any;
  automation?: any;
  efpVehicles?: any;
  fareClassRecommendationRevenue?: any;
  departurePerformance?: any;
  price?: any;
  guestsHistory?: any;
  tableColors: any;
}

export interface TableColors {
  efpHistory: HistoryColors;
  guestsHistory: HistoryColors;
}

interface HistoryColors {
  minus1?: CellColors;
  minus3?: CellColors;
  minus7?: CellColors;
  minus30?: CellColors;
  minus45?: CellColors;
}

export interface CellColors {
  bgColor?: string;
  textColor?: string;
}

type Column =
  // Departure
  | "link"
  | "leg"
  | "dayOfWeek"
  | "departureDateTime"
  | "timeToDeparture"
  | "ship"

  // Automation
  | "control"
  | "wtp"
  | "status"
  | "flags"

  // EFP vehicles
  | "efpVehiclesReserved"
  | "forecast"
  | "fcUtil"
  | "rgaEc"
  | "rgaEcqfc"
  | "rpuEc"
  | "rpuEcqfc"
  | "efpHistoryMinus1"
  | "efpHistoryMinus3"
  | "efpHistoryMinus7"
  | "efpHistoryMinus30"
  | "efpHistoryMinus45"

  // Price
  | "fareClass"
  | "price"
  | "lastYear"
  | "friend"

  // Guests
  | "reserved"
  | "remaining"
  | "guestsHistoryMinus1"
  | "guestsHistoryMinus3"
  | "guestsHistoryMinus7"
  | "guestsHistoryMinus30"
  | "guestsHistoryMinus45";

type ColumnGroup =
  | "departures"
  | "automation"
  | "efpVehicles"
  | "price"
  | "guests";

interface LoadingErrorState {
  loading?: boolean;
  error?: Error;
}

interface SalesPerformanceLoadingState {
  automation: LoadingErrorState;
  efpVehicles: LoadingErrorState;
  price: LoadingErrorState;
  guests: LoadingErrorState;
}

const smallTableRowWidth = "40px";

const createItems = (numItems: number) =>
  Array(numItems)
    .fill(null)
    .map((_, i) => createItem(String(i)));

const createItem = (id: string) => ({
  info: {
    id,
    travelId: "someid",
    legCode: "CODE",
    lastYearDepartureId: null,
    departureDateTime: {
      local: "1970-05-07 09:10:00",
      zoned: "1970-05-07T09:10:00Z",
      ianaTimeZone: "Z",
    },
    shipCode: "DANI",
    clusterCode: null,
    passengers: {
      id: "someid2:someid",
      reserved: 13,
      remaining: 14,
    },
    extraData: {
      dayOfWeek: 5,
      dayOfWeekString: "Fri",
      timeString: "09:10",
      timeToDepartureString: "7 days ago",
      minutesToDeparture: -10426,
    },
  },
  pricingPath: "/some-path",
  automation: {
    id: "someid2:someid",
    fareClassAutomation: {
      id: "someid",
      efpVehicleFareClassAllocationAutomation: {
        id: "someidEFPVehicles",
        willingnessToPaySetting: null,
        statusSetting: null,
        methodSetting: {
          id: "someotherid",
          method: {
            id: "2",
            name: "TEST_METHOD",
          },
        },
        automationState: null,
      },
    },
    departureAutomation: {
      fareClassMethodName: "TEST_METHOD",
      automationEnabled: false,
      sortFieldAutomationMethodAndDepartureDateTime: "0TEST_METHOD",
      sortFieldAutomationStatus: "JustForSorting",
      sortFieldAutomationFlags: "0",
      sortFieldAutomationWillingnessToPay: 0,
    },
  },
  efpVehicles: {
    id: "someid2:someid",
    salesPerformance: {
      id: "someid2:someid",
      booked: null,
      bookedLastYearSameDaysToDeparture: null,
      forecast: null,
      forecastUtilisation: null,
      totalCarEquivalentUnitLastYear: null,
    },
  },
  fareClassRecommendationRevenue: {
    id: "someid2:someid",
    revenueGains: [],
    futureRevenues: [],
  },
  guestsHistory: {
    id: "someid2:someid",
    guestsPerformance: [
      {
        id: "someid:1970-05-13",
        date: "1970-05-13",
        guestsReserved: null,
      },
      {
        id: "someid:1970-05-11",
        date: "1970-05-11",
        guestsReserved: null,
      },
      {
        id: "someid:1970-05-07",
        date: "1970-05-07",
        guestsReserved: 10,
        diff: -25,
      },
      {
        id: "someid:1970-04-14",
        date: "1970-04-14",
        guestsReserved: 10,
        diff: 0,
      },
      {
        id: "someid:1970-03-30",
        date: "1970-03-30",
        guestsReserved: 10,
        diff: 2,
      },
    ],
  },
  tableColors: {
    efpHistory: {
      minus1: {},
      minus3: {},
      minus7: {},
      minus30: {},
      minus45: {},
    },
    guestsHistory: {
      minus1: {},
      minus3: {},
      minus7: { bgColor: "#fda59d", textColor: "#6c2524" },
      minus30: { bgColor: "#fdaf9e", textColor: "#6d3024" },
      minus45: { bgColor: "#fdae9e", textColor: "#6d2f24" },
    },
  },
});

const items = createItems(500);

const createSalesPerformanceStandardTableConfig = (
  stickyGroups: boolean,
  loadingState: SalesPerformanceLoadingState
): StandardTableConfig<SalesPerformanceTableRowItem, Column, ColumnGroup> => ({
  keyResolver: (item) => item.info.id,
  showHeaderCheckbox: true,
  showRowCheckbox: true,
  stickyCheckboxColumn: true,
  stickyColumnGroups: stickyGroups ? "both" : undefined,
  columns: {
    /**
     * Departure
     */
    link: createColumnConfig((item) => item.info.id, {
      columnLabel: "",
      renderCell: () => (
        <Indent>
          <FlatButton />
        </Indent>
      ),
      width: "48px",
      minWidth: "48px",
    }),
    leg: createColumnConfig((item) => item.info.legCode, {
      width: "60px",
      minWidth: "60px",
    }),
    dayOfWeek: createColumnConfig(
      (item) => item.info.extraData.dayOfWeekString,
      {
        columnLabel: "Day",
        width: "60px",
        minWidth: "60px",
      }
    ),
    departureDateTime: createColumnConfig(
      (item) => item.info.departureDateTime.local,
      {
        itemLabelFormatter: (value, item) =>
          `${format(parseISO(value), "yyyy-MM-dd")} ${
            item.info.extraData.timeString
          }`,
        width: "140px",
        minWidth: "140px",
      }
    ),
    timeToDeparture: createColumnConfig(
      (item) => item.info.extraData.timeToDepartureString,
      {
        width: "90px",
        minWidth: "90px",
      }
    ),
    ship: createColumnConfig((item) => item.info.shipCode, {
      width: "60px",
      minWidth: "60px",
    }),

    /**
     * Automation
     */
    control: createColumnConfig((item) => item.automation, {
      itemLabelFormatter: (_, item) =>
        item?.automation?.departureAutomation?.fareClassMethodName
          .toUpperCase()
          .replace("_", " ") ?? "-",
      renderCell: ({ label, item }) => (
        <Indent>
          <Tag
            label={label}
            variant={
              item?.automation.departureAutomation.automationEnabled
                ? "success"
                : "passive"
            }
          />
        </Indent>
      ),
      width: "125px",
    }),
    wtp: createColumnConfig((item) => item.automation, {
      renderCell: () => (
        <Indent>
          <Chip label={"Test"} />
        </Indent>
      ),
    }),
    status: createColumnConfig((item) => item.automation, {
      renderCell: () => (
        <Indent>
          <Popover content={<Box indent={1} spacing={1} />}>
            <Icon
              icon={faCoffee}
              color={cssColor("--lhds-color-blue-300")}
              size={14}
            />
          </Popover>
        </Indent>
      ),
    }),
    flags: createColumnConfig((item) => item.automation, {
      renderCell: () => (
        <Indent>
          <Indent>
            <Popover content={<Box indent={1} spacing={1} />}>
              <Icon
                icon={faCoffee}
                color={cssColor("--lhds-color-blue-300")}
                size={14}
              />
            </Popover>
          </Indent>
        </Indent>
      ),
    }),
    /**
     * EFP vehicles
     */
    efpVehiclesReserved: createColumnConfig((item) => item.efpVehicles, {
      columnLabel: "Res.",
      renderCell: ({ value }) => (
        <Indent>
          <Text>{value?.salesPerformance.booked}</Text>
          <Space />
        </Indent>
      ),
    }),
    forecast: createColumnConfig(
      (item) => item.efpVehicles?.salesPerformance.forecast
    ),
    fcUtil: createColumnConfig((item) => item.efpVehicles?.salesPerformance, {
      columnLabel: "FC util",
      itemLabelFormatter: (value) =>
        value?.forecastUtilisation != null
          ? `${value.forecastUtilisation}%`
          : "",
    }),
    rgaEc: createColumnConfig(
      (item) => item.fareClassRecommendationRevenue?.revenueGains[0]?.value,
      { columnLabel: "RGA EC" }
    ),
    rgaEcqfc: createColumnConfig(
      (item) => item.fareClassRecommendationRevenue?.revenueGains[1]?.value,
      { columnLabel: "RGA ECQFC" }
    ),
    rpuEc: createColumnConfig(
      (item) => item.fareClassRecommendationRevenue?.futureRevenues[0]?.value,
      { columnLabel: "RPU EC" }
    ),
    rpuEcqfc: createColumnConfig(
      (item) => item.fareClassRecommendationRevenue?.futureRevenues[1]?.value,
      { columnLabel: "RPU ECQFC" }
    ),
    efpHistoryMinus1: createColumnConfig(
      (item) =>
        item.departurePerformance?.salesPerformance.efpVehicleSnapshots[0].diff,
      {
        backgroundResolver: (item) =>
          item.tableColors.efpHistory.minus1?.bgColor,
        columnLabel: "-1",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.efpHistory.minus1?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    efpHistoryMinus3: createColumnConfig(
      (item) =>
        item.departurePerformance?.salesPerformance.efpVehicleSnapshots[1].diff,
      {
        backgroundResolver: (item) =>
          item.tableColors.efpHistory.minus3?.bgColor,
        columnLabel: "-3",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.efpHistory.minus3?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    efpHistoryMinus7: createColumnConfig(
      (item) =>
        item.departurePerformance?.salesPerformance.efpVehicleSnapshots[2].diff,
      {
        backgroundResolver: (item) =>
          item.tableColors.efpHistory.minus7?.bgColor,
        columnLabel: "-7",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.efpHistory.minus7?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    efpHistoryMinus30: createColumnConfig(
      (item) =>
        item.departurePerformance?.salesPerformance.efpVehicleSnapshots[3].diff,
      {
        backgroundResolver: (item) =>
          item.tableColors.efpHistory.minus30?.bgColor,
        columnLabel: "-30",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.efpHistory.minus30?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    efpHistoryMinus45: createColumnConfig(
      (item) =>
        item.departurePerformance?.salesPerformance.efpVehicleSnapshots[4].diff,
      {
        backgroundResolver: (item) =>
          item.tableColors.efpHistory.minus45?.bgColor,
        columnLabel: "-45",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.efpHistory.minus45?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    /**
     * Price
     */
    fareClass: createColumnConfig(
      (item) => item.price?.travelPricing?.fareClass
    ),
    price: createColumnConfig(
      (item) => item.price?.travelPricing?.fareClassPrice,
      {
        itemLabelFormatter: (value) => (value ? String(round(value, 0)) : ""),
      }
    ),
    lastYear: createColumnConfig(
      (item) =>
        item.price?.lastYearDeparture?.travelHistory
          ?.equivalentDateEconomyVehicleTariffSetPrice?.price,
      {
        columnLabel: "LY",
        itemLabelFormatter: (value) => (value ? String(round(value, 0)) : ""),
      }
    ),
    friend: createColumnConfig(
      (item) => item.price?.travelPricing?.mainCompetitor?.local?.priceFare,
      {
        columnLabel: "Comp.",
        itemLabelFormatter: (value) => (value ? String(round(value, 0)) : ""),
      }
    ),
    /**
     * Guests
     */
    reserved: createColumnConfig((item) => item.info?.passengers.reserved, {
      columnLabel: "Res.",
      width: "60px",
    }),
    remaining: createColumnConfig((item) => item.info?.passengers.remaining, {
      columnLabel: "Rem.",
      width: "60px",
    }),
    guestsHistoryMinus1: createColumnConfig(
      (item) => item.guestsHistory?.guestsPerformance?.[0].diff,
      {
        columnLabel: "-1",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        backgroundResolver: (item) =>
          item.tableColors.guestsHistory.minus1?.bgColor,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.guestsHistory.minus1?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    guestsHistoryMinus3: createColumnConfig(
      (item) => item.guestsHistory?.guestsPerformance?.[1].diff,
      {
        columnLabel: "-3",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        backgroundResolver: (item) =>
          item.tableColors.guestsHistory.minus3?.bgColor,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.guestsHistory.minus3?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    guestsHistoryMinus7: createColumnConfig(
      (item) => item.guestsHistory?.guestsPerformance?.[2].diff,
      {
        columnLabel: "-7",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        backgroundResolver: (item) =>
          item.tableColors.guestsHistory.minus7?.bgColor,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.guestsHistory.minus7?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    guestsHistoryMinus30: createColumnConfig(
      (item) => item.guestsHistory?.guestsPerformance?.[3].diff,
      {
        columnLabel: "-30",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        backgroundResolver: (item) =>
          item.tableColors.guestsHistory.minus30?.bgColor,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.guestsHistory.minus30?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
    guestsHistoryMinus45: createColumnConfig(
      (item) => item.guestsHistory?.guestsPerformance?.[4].diff,
      {
        columnLabel: "-45",
        width: smallTableRowWidth,
        minWidth: smallTableRowWidth,
        backgroundResolver: (item) =>
          item.tableColors.guestsHistory.minus45?.bgColor,
        renderCell: ({ label, item }) => (
          <Indent>
            <Text color={item.tableColors.guestsHistory.minus45?.textColor}>
              {label}
            </Text>
          </Indent>
        ),
      }
    ),
  },
  columnGroups: {
    departures: {
      label: "Departures",
      contentLeft: (
        <FlatButton size={"small"} leftIcon={faAngleLeft} onClick={() => {}} />
      ),
      contentRight: (
        <FlatButton size={"small"} leftIcon={faAngleRight} onClick={() => {}} />
      ),
      columnOrder: [
        "link",
        "leg",
        "dayOfWeek",
        "departureDateTime",
        "timeToDeparture",
        "ship",
      ],
    },
    automation: {
      label: "Automation",
      loading: loadingState.automation.loading,
      borderLeft: true,
      columnOrder: ["control", "wtp", "status", "flags"],
    },
    efpVehicles: {
      label: "Sales performance (EFP vehicles)",
      loading: loadingState.efpVehicles.loading,
      borderLeft: true,
      columnOrder: [
        "efpVehiclesReserved",
        "forecast",
        "fcUtil",
        "rgaEc",
        "rgaEcqfc",
        "rpuEc",
        "rpuEcqfc",
        "efpHistoryMinus1",
        "efpHistoryMinus3",
        "efpHistoryMinus7",
        "efpHistoryMinus30",
        "efpHistoryMinus45",
      ],
    },
    price: {
      label: "Price",
      loading: loadingState.price.loading,
      borderLeft: true,
      columnOrder: ["fareClass", "price", "lastYear", "friend"],
    },
    guests: {
      label: "Guests",
      loading: loadingState.guests.loading,
      borderLeft: true,
      columnOrder: [
        "reserved",
        "remaining",
        "guestsHistoryMinus1",
        "guestsHistoryMinus3",
        "guestsHistoryMinus7",
        "guestsHistoryMinus30",
        "guestsHistoryMinus45",
      ],
    },
  },
  columnGroupOrder: [
    "departures",
    "automation",
    "efpVehicles",
    "price",
    "guests",
  ],
});

export const HorrorStory = () => {
  const s = {
    loading: false,
  };
  const config = createSalesPerformanceStandardTableConfig(false, {
    price: s,
    guests: s,
    efpVehicles: s,
    automation: s,
  });

  return <StandardTable config={config} items={items} />;
};

export const WithScroll = () => {
  const s = {
    loading: false,
  };
  const config = createSalesPerformanceStandardTableConfig(false, {
    price: s,
    guests: s,
    efpVehicles: s,
    automation: s,
  });

  return (
    <Box height={"400px"} overflowY={"scroll"}>
      <StandardTable config={config} items={items} />
    </Box>
  );
};

export const StickyColumnGroups = () => {
  const s = {
    loading: false,
  };
  const config = createSalesPerformanceStandardTableConfig(true, {
    price: s,
    guests: s,
    efpVehicles: s,
    automation: s,
  });

  return <StandardTable config={config} items={items} />;
};

export const StickyColumnsGroupsAndHeaders = () => {
  const s = {
    loading: false,
  };
  const config = createSalesPerformanceStandardTableConfig(true, {
    price: s,
    guests: s,
    efpVehicles: s,
    automation: s,
  });
  config.stickyHeader = true;

  return <StandardTable config={config} items={items} />;
};
