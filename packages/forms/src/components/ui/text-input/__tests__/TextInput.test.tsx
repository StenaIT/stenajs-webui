import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { TextInput } from "../TextInput";

describe("TextInput", () => {
  describe("onValueChange prop", () => {
    describe("gets called when text is entered", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const { container } = render(
          <TextInput value={""} onValueChange={setValueMock} />
        );

        const input = container.querySelector<HTMLInputElement>("input")!;

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
        expect(setValueMock).toBeCalledWith("34567");
      });
    });
    describe("onChange is used", () => {
      describe("gets called when text is entered", () => {
        it("works", async () => {
          const setValueMock = jest.fn();
          const { container } = render(
            <TextInput
              value={""}
              onValueChange={setValueMock}
              onChange={() => {}}
            />
          );

          const input = container.querySelector<HTMLInputElement>("input")!;

          await userEvent.type(input, "13");
          await userEvent.type(input, "7890");

          expect(setValueMock).toBeCalledTimes(6);
          expect(setValueMock).toBeCalledWith("7890");
        });
      });
    });

    describe("onKeyDown is used", () => {
      describe("gets called when text is entered", () => {
        it("works", async () => {
          const setValueMock = jest.fn();
          const { container } = render(
            <TextInput
              value={""}
              onValueChange={setValueMock}
              onKeyDown={() => {}}
            />
          );

          const input = container.querySelector<HTMLInputElement>("input")!;

          await userEvent.type(input, "13");
          await userEvent.type(input, "987");

          expect(setValueMock).toBeCalledTimes(5);
          expect(setValueMock).toBeCalledWith("987");
        });
      });
    });
  });
});
