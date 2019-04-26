import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type HeaderTextProps = TextBaseSharedProps &
  ComponentThemeProps<'HeaderText'>;

type InnerProps = HeaderTextProps & WithInnerComponentThemeProps<TextTheme>;

const HeaderTextComponent: React.FC<InnerProps> = ({ theme, ...textProps }) => (
  <TextBase {...textProps} {...theme} />
);

export const HeaderText = setDisplayName<HeaderTextProps>('HeaderText')(
  compose<InnerProps, HeaderTextProps>(
    pure,
    withComponentTheme('HeaderText'),
  )(HeaderTextComponent),
);
