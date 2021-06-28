import {
  calculateOffsetForColumnInStickyColumnGroup,
  getColumnIdsForLeftSideStickyGroup,
  getColumnIdsForRightSideStickyGroup,
} from "../StickyColumnGroupOffsetCalculator";

const config = {
  columns: {
    link: {
      width: "48px",
    },
    leg: {
      width: "60px",
    },
    dayOfWeek: {
      width: "60px",
    },
    departureDateTime: {
      width: "140px",
      minWidth: "140px",
    },
    timeToDeparture: {
      width: "90px",
      minWidth: "90px",
    },
    ship: {
      width: "60px",
      minWidth: "60px",
    },
  },

  columnGroups: {
    departures: {
      columnOrder: [
        "link",
        "leg",
        "dayOfWeek",
        "departureDateTime",
        "timeToDeparture",
        "ship",
      ],
    },
  },
  columnGroupOrder: ["departures"],
};

describe("StickyColumnGroupOffsetCalculator", () => {
  describe("calculateOffsetForStickyColumnGroup", () => {
    describe("with first column group", () => {
      it("works", () => {
        const columnIds = getColumnIdsForLeftSideStickyGroup(config as any);
        const lefts = calculateOffsetForColumnInStickyColumnGroup(
          columnIds,
          config.columns as any
        );
        expect(Object.keys(lefts).length).toBe(6);
        expect(lefts.link).toBe("calc(0px)");
        expect(lefts.leg).toBe("calc(0px + 48px)");
        expect(lefts.dayOfWeek).toBe("calc(0px + 48px + 60px)");
        expect(lefts.departureDateTime).toBe("calc(0px + 48px + 60px + 60px)");
        expect(lefts.timeToDeparture).toBe(
          "calc(0px + 48px + 60px + 60px + 140px)"
        );
        expect(lefts.ship).toBe(
          "calc(0px + 48px + 60px + 60px + 140px + 90px)"
        );
      });
    });
    describe("with last column group", () => {
      it("works", () => {
        const columnIds = getColumnIdsForRightSideStickyGroup(config as any);
        const lefts = calculateOffsetForColumnInStickyColumnGroup(
          columnIds,
          config.columns as any
        );
        expect(Object.keys(lefts).length).toBe(6);

        expect(lefts.ship).toBe("calc(0px)");
        expect(lefts.timeToDeparture).toBe("calc(0px + 60px)");
        expect(lefts.departureDateTime).toBe("calc(0px + 60px + 90px)");
        expect(lefts.dayOfWeek).toBe("calc(0px + 60px + 90px + 140px)");
        expect(lefts.leg).toBe("calc(0px + 60px + 90px + 140px + 60px)");
        expect(lefts.link).toBe(
          "calc(0px + 60px + 90px + 140px + 60px + 60px)"
        );
      });
    });
  });
});
