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
    describe("when onChange is used", () => {
      describe("onValueChange gets called when text is entered", () => {
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

    describe("when onKeyDown is used", () => {
      describe("onValueChange gets called when text is entered", () => {
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
  describe("onChange prop", () => {
    describe("gets called when text is entered", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const { container } = render(
          <TextInput value={""} onChange={setValueMock} />
        );

        const input = container.querySelector<HTMLInputElement>("input")!;

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
      });
    });
  });
  describe("onKeyDown prop", () => {
    describe("gets called when text is entered", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const { container } = render(
          <TextInput value={""} onKeyDown={setValueMock} />
        );

        const input = container.querySelector<HTMLInputElement>("input")!;

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
      });
    });
  });
  describe("onChange and onKeyDown prop combined", () => {
    describe("both gets called when text is entered", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const setValueMock2 = jest.fn();
        const { container } = render(
          <TextInput
            value={""}
            onChange={setValueMock2}
            onKeyDown={setValueMock}
          />
        );

        const input = container.querySelector<HTMLInputElement>("input")!;

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
        expect(setValueMock2).toBeCalledTimes(7);
      });
    });
  });
});
