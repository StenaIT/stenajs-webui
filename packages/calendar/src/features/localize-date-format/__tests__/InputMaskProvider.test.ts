import {
  createInputMaskForDateFormat,
  dayMask,
  monthMask,
  yearMask,
} from "../InputMaskProvider";

describe("InputMaskProvider", () => {
  describe("createInputMaskForDateFormat", () => {
    describe("for Sweden", () => {
      it("works", () => {
        expect(createInputMaskForDateFormat("yyyy-MM-dd")).toEqual([
          ...yearMask,
          "-",
          ...monthMask,
          "-",
          ...dayMask,
        ]);
      });
    });
    describe("for UK", () => {
      it("works", () => {
        expect(createInputMaskForDateFormat("MM/dd/yyyy")).toEqual([
          ...monthMask,
          "/",
          ...dayMask,
          "/",
          ...yearMask,
        ]);
      });
    });
  });
});
