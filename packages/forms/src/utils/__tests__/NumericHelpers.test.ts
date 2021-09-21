import { onStepValueChange, onTextValueChange } from "../NumericHelpers";

describe("NumericHelpers", () => {
  describe("onStepValueChange", () => {
    const onValueChange = jest.fn();
    beforeEach(() => {
      onValueChange.mockClear();
    });
    describe.each`
      value        | numSteps | min          | max          | expected
      ${undefined} | ${5}     | ${undefined} | ${undefined} | ${"5"}
      ${undefined} | ${5}     | ${3}         | ${8}         | ${"5"}
      ${undefined} | ${1}     | ${3}         | ${8}         | ${"3"}
      ${undefined} | ${9}     | ${3}         | ${8}         | ${"8"}
      ${"5"}       | ${1}     | ${undefined} | ${undefined} | ${"6"}
      ${"5"}       | ${1}     | ${3}         | ${8}         | ${"6"}
      ${"5"}       | ${5}     | ${3}         | ${8}         | ${"8"}
      ${"5"}       | ${-5}    | ${3}         | ${8}         | ${"3"}
    `(
      "when value is $value, numSteps is numSteps, min is $min, and max is max",
      ({ value, numSteps, min, max, expected }) => {
        it(`should set value to ${expected}`, () => {
          onStepValueChange({
            onValueChange,
            value,
            numSteps,
            min,
            max,
          });
          expect(onValueChange).toHaveBeenCalledWith(expected);
        });
      }
    );
  });

  describe("onTextValueChange", () => {
    const onValueChange = jest.fn();
    beforeEach(() => {
      onValueChange.mockClear();
    });
    describe.each`
      newValue | min          | max          | expected
      ${""}    | ${undefined} | ${undefined} | ${""}
      ${""}    | ${3}         | ${8}         | ${""}
      ${"5"}   | ${undefined} | ${undefined} | ${"5"}
      ${"5"}   | ${undefined} | ${undefined} | ${"5"}
      ${"5"}   | ${3}         | ${8}         | ${"5"}
      ${"10"}  | ${3}         | ${8}         | ${"8"}
      ${"1"}   | ${3}         | ${8}         | ${"3"}
    `(
      "when newValue is newValue, min is $min, and max is max",
      ({ newValue, min, max, expected }) => {
        it(`should set value to ${expected}`, () => {
          onTextValueChange({
            onValueChange,
            newValue,
            min,
            max,
          });
          expect(onValueChange).toHaveBeenCalledWith(expected);
        });
      }
    );
  });
});
