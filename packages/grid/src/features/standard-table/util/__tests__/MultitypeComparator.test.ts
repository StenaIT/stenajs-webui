import { multitypeComparator } from "../MultitypeComparator";

describe("MultitypeComparator", () => {
  describe("left side is null", () => {
    it("returns 1", () => {
      return expect(multitypeComparator(null, 1)).toBe(1);
    });
  });

  describe("left side is undefined", () => {
    it("returns 1", () => {
      return expect(multitypeComparator(undefined, 1)).toBe(1);
    });
  });

  describe("right side is null", () => {
    it("returns -1", () => {
      return expect(multitypeComparator(1, null)).toBe(-1);
    });
  });

  describe("right side is undefined", () => {
    it("returns -1", () => {
      return expect(multitypeComparator(1, undefined)).toBe(-1);
    });
  });

  describe("when type is number", () => {
    describe("values are same", () => {
      it("returns 0", () => expect(multitypeComparator(1, 1)).toBe(0));
    });
  });

  describe("when type is number", () => {
    describe("a === b", () => {
      it("returns 0", () => {
        expect(multitypeComparator(1, 1) === 0).toBeTruthy();
      });
    });

    describe("a > b", () => {
      it("returns positive", () => {
        expect(multitypeComparator(2, 1) > 0).toBeTruthy();
      });
    });

    describe("a < b", () => {
      it("returns negative", () => {
        expect(multitypeComparator(1, 2) < 0).toBeTruthy();
      });
    });
  });

  describe("when type is boolean", () => {
    describe("a === b", () => {
      it("returns 0", () => {
        expect(multitypeComparator(true, true) === 0).toBeTruthy();
      });
    });

    describe("a && !b", () => {
      it("returns negative", () => {
        expect(multitypeComparator(true, false) < 0).toBeTruthy();
      });
    });

    describe("!a && b", () => {
      it("returns positive", () => {
        expect(multitypeComparator(false, true) > 0).toBeTruthy();
      });
    });
  });

  describe("when type is string", () => {
    describe("a === b", () => {
      it("returns 0", () => {
        expect(multitypeComparator("bbb", "bbb") === 0).toBeTruthy();
      });
    });

    describe("a is after b", () => {
      it("returns positive", () => {
        expect(multitypeComparator("bbb", "aaa") > 0).toBeTruthy();
      });
    });

    describe("a is before b", () => {
      it("returns negative", () => {
        expect(multitypeComparator("aaa", "bbb") < 0).toBeTruthy();
      });
    });
  });

  describe("when type is date", () => {
    const earlyDate = new Date(2020, 1, 1, 12, 0);
    const earlyDateCopy = new Date(2020, 1, 1, 12, 0);
    const lateDate = new Date(2020, 1, 1, 12, 30);
    describe("a === b", () => {
      it("returns 0", () => {
        expect(multitypeComparator(earlyDate, earlyDate) === 0).toBeTruthy();
      });
    });

    describe("a and b are equal by value", () => {
      it("returns 0", () => {
        expect(
          multitypeComparator(earlyDate, earlyDateCopy) === 0
        ).toBeTruthy();
      });
    });

    describe("a is after b", () => {
      it("returns positive", () => {
        expect(multitypeComparator(lateDate, earlyDate) > 0).toBeTruthy();
      });
    });

    describe("a is before b", () => {
      it("returns negative", () => {
        expect(multitypeComparator(earlyDate, lateDate) < 0).toBeTruthy();
      });
    });
  });
});
