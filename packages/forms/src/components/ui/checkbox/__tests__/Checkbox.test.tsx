import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Checkbox } from "../Checkbox";

afterEach(cleanup);

describe("Checkbox", () => {
  describe("disabled", () => {
    describe("when disabled is true", () => {
      it("sets onClick to undefined", () => {
        const props = {
          onChange: jest.fn(),
          onValueChange: jest.fn()
        };
        const { getByRole } = render(<Checkbox {...props} disabled />);
        fireEvent.click(getByRole("checkbox"));
        expect(props.onChange).not.toHaveBeenCalled();
        expect(props.onValueChange).not.toHaveBeenCalled();
      });
    });

    describe("when disabled is false", () => {
      it("sets onClick to specified onClick", () => {
        const props = {
          onChange: jest.fn(),
          onValueChange: jest.fn()
        };
        const value = true;
        const { getByRole } = render(<Checkbox {...props} value={value} />);
        fireEvent.click(getByRole("checkbox"));
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onValueChange).toHaveBeenCalledTimes(1);
        expect(props.onValueChange).toHaveBeenCalledWith(!value);
      });
    });
  });
});
