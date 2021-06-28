import {
  calculateOffsetForColumnInStickyColumnGroups,
  calculateOffsetForColumns,
  getColumnIdsForLeftSideStickyGroup,
  getColumnIdsForRightSideStickyGroup,
} from "../StickyColumnGroupOffsetCalculator";

describe("StickyColumnGroupOffsetCalculator", () => {
  describe("calculateOffsetForColumnInStickyColumnGroups", () => {
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
        left: {
          sticky: false,
          columnOrder: ["link", "leg", "dayOfWeek"],
        },
        right: {
          sticky: false,
          columnOrder: ["departureDateTime", "timeToDeparture", "ship"],
        },
      },
      columnGroupOrder: ["left", "right"],
    };

    describe("when first and last are sticky", () => {
      it("includes offset for both", () => {
        config.columnGroups.left.sticky = true;
        config.columnGroups.right.sticky = true;
        const offsets = calculateOffsetForColumnInStickyColumnGroups(
          config as any
        );
        expect(Object.keys(offsets).length).toBe(6);
        expect(offsets.link).toBe("calc(0px)");
        expect(offsets.leg).toBe("calc(0px + 48px)");
        expect(offsets.dayOfWeek).toBe("calc(0px + 48px + 60px)");

        expect(offsets.ship).toBe("calc(0px)");
        expect(offsets.timeToDeparture).toBe("calc(0px + 60px)");
        expect(offsets.departureDateTime).toBe("calc(0px + 60px + 90px)");
      });
    });

    describe("when first is sticky", () => {
      it("includes offset for first only", () => {
        config.columnGroups.left.sticky = true;
        config.columnGroups.right.sticky = false;
        const offsets = calculateOffsetForColumnInStickyColumnGroups(
          config as any
        );
        console.log(offsets);
        expect(Object.keys(offsets).length).toBe(3);
        expect(offsets.link).toBe("calc(0px)");
        expect(offsets.leg).toBe("calc(0px + 48px)");
        expect(offsets.dayOfWeek).toBe("calc(0px + 48px + 60px)");
      });
    });

    describe("when last is sticky", () => {
      config.columnGroups.left.sticky = false;
      config.columnGroups.right.sticky = true;

      it("includes offset for last", () => {
        const offsets = calculateOffsetForColumnInStickyColumnGroups(
          config as any
        );
        expect(Object.keys(offsets).length).toBe(3);
        expect(offsets.ship).toBe("calc(0px)");
        expect(offsets.timeToDeparture).toBe("calc(0px + 60px)");
        expect(offsets.departureDateTime).toBe("calc(0px + 60px + 90px)");
      });
    });
  });
  describe("calculateOffsetForColumns", () => {
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

    describe("with first column group", () => {
      it("works", () => {
        const columnIds = getColumnIdsForLeftSideStickyGroup(config as any);
        const offsets = calculateOffsetForColumns(
          columnIds,
          config.columns as any
        );
        expect(Object.keys(offsets).length).toBe(6);
        expect(offsets.link).toBe("calc(0px)");
        expect(offsets.leg).toBe("calc(0px + 48px)");
        expect(offsets.dayOfWeek).toBe("calc(0px + 48px + 60px)");
        expect(offsets.departureDateTime).toBe(
          "calc(0px + 48px + 60px + 60px)"
        );
        expect(offsets.timeToDeparture).toBe(
          "calc(0px + 48px + 60px + 60px + 140px)"
        );
        expect(offsets.ship).toBe(
          "calc(0px + 48px + 60px + 60px + 140px + 90px)"
        );
      });
    });
    describe("with last column group", () => {
      it("works", () => {
        const columnIds = getColumnIdsForRightSideStickyGroup(config as any);
        const offsets = calculateOffsetForColumns(
          columnIds,
          config.columns as any
        );
        expect(Object.keys(offsets).length).toBe(6);

        expect(offsets.ship).toBe("calc(0px)");
        expect(offsets.timeToDeparture).toBe("calc(0px + 60px)");
        expect(offsets.departureDateTime).toBe("calc(0px + 60px + 90px)");
        expect(offsets.dayOfWeek).toBe("calc(0px + 60px + 90px + 140px)");
        expect(offsets.leg).toBe("calc(0px + 60px + 90px + 140px + 60px)");
        expect(offsets.link).toBe(
          "calc(0px + 60px + 90px + 140px + 60px + 60px)"
        );
      });
    });
  });
});
