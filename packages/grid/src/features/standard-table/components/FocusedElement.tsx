import styled from "@emotion/styled";
import { BoxProps } from "@stenajs-webui/core";

export interface FocusedElementProps {
  justifyContent: BoxProps["justifyContent"];
  borderRadius?: string;
  focusBorder?: string;
  hoverBorder?: string;
}

export const FocusedElement = styled.div<FocusedElementProps>`
  border: 1px solid transparent;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : ""};

  &:hover {
    ${({ hoverBorder }) => (hoverBorder ? `border: ${hoverBorder};` : "")}
  }

  &:focus {
    ${({ focusBorder }) => (focusBorder ? `border: ${focusBorder};` : "")}
  }
`;
