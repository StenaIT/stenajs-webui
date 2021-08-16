import styled from "@emotion/styled";

export const TrWithHoverBackground = styled.tr<{
  borderLeft?: string;
  height?: string;
  focusBackground?: string;
  hoverBackground?: string;
  background?: string;
}>`
  ${({ focusBackground }) =>
    focusBackground ? `--focus-within-background: ${focusBackground};` : ""}
  ${({ borderLeft }) => (borderLeft ? `border-left: ${borderLeft};` : "")};
  ${({ background }) => (background ? `background: ${background};` : "")};
  ${({ height }) => (height ? `height: ${height};` : "")};
  ${({ hoverBackground }) =>
    hoverBackground
      ? `  &:hover {
    background: ${hoverBackground};
  }
`
      : ""}
`;
