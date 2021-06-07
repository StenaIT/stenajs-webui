import { createMultiTypeComparator } from "../MultiTypeComparator";

describe("MultiTypeComparator", () => {
  describe("sorting asc", () => {
    describe("list with numbers and null", () => {
      it("sorts null last", () => {
        const list = [0, null, 2, 3, null, 0];
        list.sort(createMultiTypeComparator());
        expect(list).toEqual([0, 0, 2, 3, null, null]);
      });
    });
    describe("list with strings and null", () => {
      it("sorts null last", () => {
        const list = ["0", null, "2", "3", null, ""];
        list.sort(createMultiTypeComparator());
        expect(list).toEqual(["0", "2", "3", "", null, null]);
      });
    });
    describe("left side is nullable", () => {
      describe("right side is falsy", () => {
        it("returns 1", () => {
          expect(createMultiTypeComparator()(null, 0)).toBe(1);
          expect(createMultiTypeComparator()(undefined, 0)).toBe(1);
        });
      });
      describe("right side is not falsy", () => {
        it("returns 1", () => {
          expect(createMultiTypeComparator()(null, 1)).toBe(1);
          expect(createMultiTypeComparator()(undefined, 1)).toBe(1);
        });
      });
    });

    describe("right side is nullable", () => {
      describe("left side is falsy", () => {
        it("returns -1", () => {
          expect(createMultiTypeComparator()(0, null)).toBe(-1);
          expect(createMultiTypeComparator()(0, undefined)).toBe(-1);
        });
      });
      describe("left side is not falsy", () => {
        it("returns -1", () => {
          expect(createMultiTypeComparator()(1, null)).toBe(-1);
          expect(createMultiTypeComparator()(1, undefined)).toBe(-1);
        });
      });
    });

    describe("when type is number", () => {
      describe("values are same", () => {
        it("returns 0", () =>
          expect(createMultiTypeComparator()(1, 1)).toBe(0));
      });

      describe("a > b", () => {
        it("returns positive", () => {
          expect(createMultiTypeComparator()(2, 1) > 0).toBeTruthy();
        });
      });

      describe("a < b", () => {
        it("returns negative", () => {
          expect(createMultiTypeComparator()(1, 2) < 0).toBeTruthy();
        });
      });
    });

    describe("when type is boolean", () => {
      describe("a === b", () => {
        it("returns 0", () => {
          expect(createMultiTypeComparator()(true, true) === 0).toBeTruthy();
        });
      });

      describe("a && !b", () => {
        it("returns negative", () => {
          expect(createMultiTypeComparator()(true, false) < 0).toBeTruthy();
        });
      });

      describe("!a && b", () => {
        it("returns positive", () => {
          expect(createMultiTypeComparator()(false, true) > 0).toBeTruthy();
        });
      });
    });

    describe("when type is string", () => {
      describe("a === b", () => {
        it("returns 0", () => {
          expect(createMultiTypeComparator()("bbb", "bbb") === 0).toBeTruthy();
        });
      });

      describe("a is after b", () => {
        it("returns positive", () => {
          expect(createMultiTypeComparator()("bbb", "aaa") > 0).toBeTruthy();
        });
      });

      describe("a is before b", () => {
        it("returns negative", () => {
          expect(createMultiTypeComparator()("aaa", "bbb") < 0).toBeTruthy();
        });
      });
    });

    describe("when type is date", () => {
      const earlyDate = new Date(2020, 1, 1, 12, 0);
      const earlyDateCopy = new Date(2020, 1, 1, 12, 0);
      const lateDate = new Date(2020, 1, 1, 12, 30);
      describe("a === b", () => {
        it("returns 0", () => {
          expect(
            createMultiTypeComparator()(earlyDate, earlyDate) === 0
          ).toBeTruthy();
        });
      });

      describe("a and b are equal by value", () => {
        it("returns 0", () => {
          expect(
            createMultiTypeComparator()(earlyDate, earlyDateCopy) === 0
          ).toBeTruthy();
        });
      });

      describe("a is after b", () => {
        it("returns positive", () => {
          expect(
            createMultiTypeComparator()(lateDate, earlyDate) > 0
          ).toBeTruthy();
        });
      });

      describe("a is before b", () => {
        it("returns negative", () => {
          expect(
            createMultiTypeComparator()(earlyDate, lateDate) < 0
          ).toBeTruthy();
        });
      });
    });
  });

  describe("sorting desc", () => {
    describe("list with numbers and null", () => {
      it("sorts null last", () => {
        const list = [0, null, 2, 3, null, 0];
        list.sort(createMultiTypeComparator(true));
        expect(list).toEqual([3, 2, 0, 0, null, null]);
      });
    });
    describe("list with strings and null", () => {
      it("sorts empty string and null last", () => {
        const list = ["0", null, "2", "3", null, ""];
        list.sort(createMultiTypeComparator(true));
        expect(list).toEqual(["3", "2", "0", "", null, null]);
      });
    });
    describe("left side is nullable", () => {
      describe("right side is falsy", () => {
        it("returns 1", () => {
          expect(createMultiTypeComparator(true)(null, 0)).toBe(1);
          expect(createMultiTypeComparator(true)(undefined, 0)).toBe(1);
        });
      });
      describe("right side is not falsy", () => {
        it("returns 1", () => {
          expect(createMultiTypeComparator(true)(null, 1)).toBe(1);
          expect(createMultiTypeComparator(true)(undefined, 1)).toBe(1);
        });
      });
    });

    describe("right side is nullable", () => {
      describe("left side is falsy", () => {
        it("returns -1", () => {
          expect(createMultiTypeComparator(true)(0, null)).toBe(-1);
          expect(createMultiTypeComparator(true)(0, undefined)).toBe(-1);
        });
      });
      describe("left side is not falsy", () => {
        it("returns -1", () => {
          expect(createMultiTypeComparator(true)(1, null)).toBe(-1);
          expect(createMultiTypeComparator(true)(1, undefined)).toBe(-1);
        });
      });
    });
  });
});
