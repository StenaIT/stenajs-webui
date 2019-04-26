import styled from '@emotion/styled';
import { FontWeightProperty } from 'csstype';
import * as React from 'react';

export interface TextBaseProps {
  /** The font size of the text. */
  fontSize: string;
  /** The font family of the text. */
  fontFamily: string;
  /** The normal font weight of the text. */
  fontWeightNormal?: FontWeightProperty;
  /** The bold font weight of the text. */
  fontWeightBold: FontWeightProperty;
  /** The light font weight of the text. */
  fontWeightLight: FontWeightProperty;

  /** The color family of the text. */
  color?: string;
  /** Disables wrapping of text. */
  nowrap?: boolean;
  /** Adds underline to text. */
  underline?: boolean;
  /**
   * Makes text bold.
   * @deprecated Use prop weight instead.
   */
  bold?: boolean;
  /** Font weight to use. */
  weight?: TextBaseWeight;
  /** Adds underline when mouse hovers over text. */
  hoverUnderline?: boolean;
  /** Makes text italic. */
  italic?: boolean;
  /** Disables the ability to select the text. */
  disableSelect?: boolean;
}

export type TextBaseWeight = 'bold' | 'normal' | 'light';

const SpanWithHover = styled.span<TextBaseProps>`
  fontSize: ${(fontSize) => fontSize}
  fontFamily: ${(fontFamily) => fontFamily}
  color: ${(color) => color}
  fontWeight: ${(props) => props.bold ? 'bold' : getWeight(props.weight, props)};
  userSelect: ${({ disableSelect }) => disableSelect ? 'none' : ''};
  textDecoration: ${({ underline }) => underline ? 'underline' : ''};
  whiteSpace: ${({ nowrap }) => nowrap ? 'nowrap' : ''};
  fontStyle: ${({ italic }) => italic ? 'italic' : ''};
  :hover {
    ${({ hoverUnderline }) => (hoverUnderline ? 'text-decoration: underline;' : '')};
  }
`;

export const TextBase: React.FC<TextBaseProps> = SpanWithHover;

const getWeight = (
  weight: TextBaseWeight | undefined,
  props: TextBaseProps,
): FontWeightProperty | undefined => {
  switch (weight) {
    case 'bold':
      return props.fontWeightBold;
    case 'light':
      return props.fontWeightLight;
    default:
      return props.fontWeightNormal;
  }
};
