import * as React from "react";
import { createColumnConfig } from "../config/StandardTableColumnConfig";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { EntityCrudStatus } from "@stenajs-webui/redux";
import { StandardTable } from "../components/StandardTable";

export default {
  title: "grid/StandardTable/Waitlist",
};

const borderLeft = "1px solid var(--ui5)";

const editableMaxOverbooks = ["Length", "Drivers", "Weight"];

interface WaitlistCapacityQuery_freightSailing_byId_totals {
  id: string;
  booked: number | null;
  capacity: number | null;
  checkedIn: number | null;
  description: string;
  maxOverbook: number | null;
  reserved: number;
}

interface WaitlistCapacityRowItem {
  id: string;
  data: WaitlistCapacityQuery_freightSailing_byId_totals;
  status: {
    capacity?: EntityCrudStatus;
    maxOverbook?: EntityCrudStatus;
  };
}

type WaitlistCapacityColumnKey =
  | "departureTotals"
  | "capacity"
  | "maxOverbook"
  | "reserved"
  | "checkedIn"
  | "booked";

const createWaitlistCapacityTableConfig = (
  onEnterDepartureTotalsCapacity: (
    item: WaitlistCapacityRowItem,
    value: string | undefined
  ) => void,
  onEnterDepartureTotalsMaxOverbook: (
    item: WaitlistCapacityRowItem,
    value: string | undefined
  ) => void
): StandardTableConfig<WaitlistCapacityRowItem, WaitlistCapacityColumnKey> => ({
  keyResolver: (item) => item.id,
  enableGridCell: true,
  rowIndent: 1,
  columns: {
    departureTotals: createColumnConfig((item) => item.data.description, {
      columnLabel: "",
      disableGridCell: true,
    }),
    capacity: createColumnConfig<WaitlistCapacityRowItem, string | undefined>(
      (item) => numberToStringElseUndefined(item.data.capacity),
      {
        justifyContentCell: "flex-end",
        justifyContentHeader: "flex-end",
        onChange: onEnterDepartureTotalsCapacity,
        isEditable: true,
        borderLeft,
      }
    ),
    maxOverbook: createColumnConfig<
      WaitlistCapacityRowItem,
      string | undefined
    >((item) => numberToStringElseUndefined(item.data.maxOverbook), {
      justifyContentCell: "flex-end",
      justifyContentHeader: "flex-end",
      onChange: onEnterDepartureTotalsMaxOverbook,
      isEditable: (item) =>
        editableMaxOverbooks.indexOf(item.data.description) >= 0,
    }),
    reserved: createColumnConfig((item) => item.data.reserved, {
      justifyContentCell: "flex-end",
      justifyContentHeader: "flex-end",
      disableGridCell: true,
      borderLeft,
    }),
    checkedIn: createColumnConfig((item) => item.data.checkedIn, {
      justifyContentCell: "flex-end",
      justifyContentHeader: "flex-end",
      disableGridCell: true,
    }),
    booked: createColumnConfig((item) => item.data.booked, {
      justifyContentCell: "flex-end",
      justifyContentHeader: "flex-end",
      disableGridCell: true,
    }),
  },
  columnOrder: [
    "departureTotals",
    "capacity",
    "maxOverbook",
    "reserved",
    "checkedIn",
    "booked",
  ],
});

const numberToStringElseUndefined = (
  num: number | undefined | null
): string | undefined => {
  if (num == null) {
    return undefined;
  }
  return String(num);
};

const items = [
  {
    data: {
      __typename: "FreightSailingTotal",
      booked: 0,
      capacity: 1638,
      checkedIn: 0,
      description: "Length",
      id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Length",
      maxOverbook: 5,
      reserved: 772.5,
    },
    id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Length",
    status: {},
  },
  {
    data: {
      __typename: "FreightSailingTotal",
      booked: 0,
      capacity: 65,
      checkedIn: 0,
      description: "Drivers",
      id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Drivers",
      maxOverbook: 0,
      reserved: 44,
    },
    id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Drivers",
    status: {},
  },
  {
    data: {
      __typename: "FreightSailingTotal",
      booked: null,
      capacity: 999999,
      checkedIn: null,
      description: "Wait list",
      id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Wait list",
      maxOverbook: null,
      reserved: 0,
    },
    id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Wait list",
    status: {},
  },
  {
    data: {
      __typename: "FreightSailingTotal",
      booked: null,
      capacity: 4800,
      checkedIn: null,
      description: "Weight",
      id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Weight",
      maxOverbook: 4800,
      reserved: 1280.354,
    },
    id: "fa2c4485-3754-4d71-94d5-8556fea469a7:Weight",
    status: {},
  },
];

export const WaitlistTable = () => {
  const config = createWaitlistCapacityTableConfig(
    () => {},
    () => {}
  );
  return <StandardTable config={config} items={items} />;
};
