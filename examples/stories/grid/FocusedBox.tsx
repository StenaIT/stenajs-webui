import styled, { StyledComponent } from "@emotion/styled";

interface FocusedBoxProps {
  isEditable?: boolean;
}

type FocusedBoxComponent = StyledComponent<
  JSX.IntrinsicElements["div"],
  FocusedBoxProps,
  any
>;

export const FocusedBox: FocusedBoxComponent = styled.div<FocusedBoxProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 34px;
    :focus {
      outline: ${({ isEditable }) =>
        isEditable ? "#605988" : "#cbcbcb"} solid 2px;
    }
  })
  `;
