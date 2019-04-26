import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type LargeTextProps = TextBaseSharedProps &
  ComponentThemeProps<'LargeText'>;

type InnerProps = LargeTextProps & WithInnerComponentThemeProps<TextTheme>;

const LargeTextComponent = ({ theme, ...textProps }: InnerProps) => (
  <TextBase {...textProps} {...theme} />
);

export const LargeText = setDisplayName<LargeTextProps>('LargeText')(
  compose<InnerProps, LargeTextProps>(
    pure,
    withComponentTheme('LargeText'),
  )(LargeTextComponent),
);
