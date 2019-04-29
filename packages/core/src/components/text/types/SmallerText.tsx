import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type SmallerTextProps = TextBaseSharedProps &
  ComponentThemeProps<'SmallerText'>;

type InnerProps = SmallerTextProps & WithInnerComponentThemeProps<TextTheme>;

const SmallerTextComponent: React.FC<InnerProps> = ({
  theme,
  ...textProps
}) => <TextBase {...textProps} {...theme} />;

export const SmallerText = setDisplayName<SmallerTextProps>('SmallerText')(
  compose<InnerProps, SmallerTextProps>(
    pure,
    withComponentTheme('SmallerText'),
  )(SmallerTextComponent),
);
