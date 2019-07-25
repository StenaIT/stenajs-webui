import styled from "@emotion/styled";

interface FocusedBoxProps {
  isEditable?: boolean;
}

export const FocusedBox = styled.div<FocusedBoxProps>`
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
