import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { useGridCell } from "@stenajs-webui/grid";
import { TextInput, TextInputProps } from "../TextInput";

const TextInputWithGridCell: React.FC<TextInputProps> = (props) => {
  const { requiredProps } = useGridCell(props.value, {
    rowIndex: 0,
    colIndex: 0,
    numRows: 10,
    numCols: 10,
    tableId: "test123",
  });
  return <TextInput {...requiredProps} {...props} />;
};

describe("TextInput", () => {
  const ariaLabel = "Some input";

  describe("ariaLabel prop", () => {
    describe("is set on input DOM element", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const { getByLabelText } = render(
          <TextInput
            value={""}
            onValueChange={setValueMock}
            aria-label={ariaLabel}
          />
        );

        const input = getByLabelText(ariaLabel);
        expect(input.tagName.toUpperCase()).toBe("INPUT");
      });
    });
  });

  describe("onValueChange prop", () => {
    describe("gets called when text is entered", () => {
      it("works", async () => {
        const setValueMock = jest.fn();
        const { getByLabelText } = render(
          <TextInput
            value={""}
            onValueChange={setValueMock}
            aria-label={ariaLabel}
          />
        );

        const input = getByLabelText(ariaLabel);

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
        expect(setValueMock).toBeCalledWith("34567");
      });
    });

    describe("and useGridCell is used", () => {
      describe("gets called when text is entered", () => {
        it("works", async () => {
          const setValueMock = jest.fn();
          const { getByLabelText } = render(
            <TextInputWithGridCell
              value={""}
              onValueChange={setValueMock}
              onMove={() => {}}
              selectAllOnFocus
              aria-label={ariaLabel}
            />
          );

          const input = getByLabelText(ariaLabel);

          await userEvent.type(input, "12");
          await userEvent.type(input, "34567");

          expect(setValueMock).toBeCalledTimes(7);
          expect(setValueMock).toBeCalledWith("34567");
        });
      });
    });

    describe("when onMove is used", () => {
      describe("onValueChange gets called when text is entered", () => {
        it("works", async () => {
          const setValueMock = jest.fn();
          const { getByLabelText } = render(
            <TextInput
              value={""}
              onValueChange={setValueMock}
              onMove={() => {}}
              aria-label={ariaLabel}
            />
          );

          const input = getByLabelText(ariaLabel);

          await userEvent.type(input, "13");
          await userEvent.type(input, "7890");

          expect(setValueMock).toBeCalledTimes(6);
          expect(setValueMock).toBeCalledWith("7890");
        });
      });

      describe("and selectAllOnFocus is true", () => {
        describe("onValueChange gets called when text is entered", () => {
          it("works", async () => {
            const setValueMock = jest.fn();
            const { getByLabelText } = render(
              <TextInput
                value={""}
                onValueChange={setValueMock}
                selectAllOnFocus
                onMove={() => {}}
                aria-label={ariaLabel}
              />
            );

            const input = getByLabelText(ariaLabel);

            await userEvent.type(input, "11");
            await userEvent.type(input, "7890");

            expect(setValueMock).toBeCalledTimes(6);
            expect(setValueMock).toBeCalledWith("7890");
          });
        });
      });
    });

    describe("when onChange is used", () => {
      describe("onValueChange gets called when text is entered", () => {
        it("works", async () => {
          const setValueMock = jest.fn();
          const { getByLabelText } = render(
            <TextInput
              value={""}
              onValueChange={setValueMock}
              onChange={() => {}}
              aria-label={ariaLabel}
            />
          );

          const input = getByLabelText(ariaLabel);

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
          const { getByLabelText } = render(
            <TextInput
              value={""}
              onValueChange={setValueMock}
              onKeyDown={() => {}}
              aria-label={ariaLabel}
            />
          );

          const input = getByLabelText(ariaLabel);

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
        const { getByLabelText } = render(
          <TextInput
            value={""}
            onChange={setValueMock}
            aria-label={ariaLabel}
          />
        );

        const input = getByLabelText(ariaLabel);

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
        const { getByLabelText } = render(
          <TextInput
            value={""}
            onKeyDown={setValueMock}
            aria-label={ariaLabel}
          />
        );

        const input = getByLabelText(ariaLabel);

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
        const { getByLabelText } = render(
          <TextInput
            value={""}
            onChange={setValueMock2}
            onKeyDown={setValueMock}
            aria-label={ariaLabel}
          />
        );

        const input = getByLabelText(ariaLabel);

        await userEvent.type(input, "12");
        await userEvent.type(input, "34567");

        expect(setValueMock).toBeCalledTimes(7);
        expect(setValueMock2).toBeCalledTimes(7);
      });
    });
  });
});
