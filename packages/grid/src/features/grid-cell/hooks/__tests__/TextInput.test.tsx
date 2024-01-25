import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { useGridCell } from "../UseGridCell";
import { vi } from "vitest";

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

const ariaLabel = "Some input";

describe("useGridCell", () => {
  it("setValueMock gets called when text is entered", async () => {
    const setValueMock = vi.fn();
    const { getByLabelText } = render(
      <TextInputWithGridCell
        value={""}
        onValueChange={setValueMock}
        onMove={() => {}}
        aria-label={ariaLabel}
      />
    );

    const input = getByLabelText(ariaLabel);

    await userEvent.type(input, "12");
    await userEvent.type(input, "34567");

    expect(setValueMock).toBeCalledTimes(7);
    expect(setValueMock).toBeCalledWith("1");
    expect(setValueMock).toBeCalledWith("2");
    expect(setValueMock).toBeCalledWith("3");
    expect(setValueMock).toBeCalledWith("4");
    expect(setValueMock).toBeCalledWith("5");
    expect(setValueMock).toBeCalledWith("6");
    expect(setValueMock).toBeCalledWith("7");
  });
});
