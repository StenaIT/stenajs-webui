import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type DefaultTextProps = TextBaseSharedProps &
  ComponentThemeProps<'DefaultText'>;

type InnerProps = DefaultTextProps & WithInnerComponentThemeProps<TextTheme>;

const DefaultTextComponent: React.FC<InnerProps> = ({
  theme,
  ...textProps
}) => <TextBase {...textProps} {...theme} />;

export const DefaultText = setDisplayName<DefaultTextProps>('DefaultText')(
  compose<InnerProps, DefaultTextProps>(
    pure,
    withComponentTheme('DefaultText'),
  )(DefaultTextComponent),
);
