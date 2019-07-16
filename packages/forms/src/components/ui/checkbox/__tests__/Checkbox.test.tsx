import { Icon } from "@stenajs-webui/elements";
import { shallow } from "enzyme";
import * as React from "react";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  const props = {
    onChange: jest.fn()
  };

  describe("icon", () => {
    describe("when checked", () => {
      it("uses specified icon from theme", () => {
        const wrapper = shallow(<Checkbox {...props} value={true} />);
        expect(wrapper.find(Icon).prop("icon")).toBeDefined(); // TODO Check correct icon.
      });
    });

    describe("when not checked", () => {
      it("has no icon", () => {
        const wrapper = shallow(<Checkbox {...props} value={false} />);
        expect(wrapper.find(Icon).length).toBe(0);
      });
    });
  });

  describe("color", () => {
    describe("when disabled", () => {
      it("uses specified color from theme even if value is true", () => {
        const wrapper = shallow(<Checkbox {...props} value={true} disabled />);
        expect(wrapper.find(Icon).prop("color")).toBeDefined(); // TODO Check correct color.
      });
    });

    describe("when checked", () => {
      it("uses specified color from theme", () => {
        const wrapper = shallow(<Checkbox {...props} value={true} />);
        expect(wrapper.find(Icon).prop("color")).toBeDefined(); // TODO Check correct color.
      });
    });
  });
});
