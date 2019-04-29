import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type TinyTextProps = TextBaseSharedProps &
  ComponentThemeProps<'TinyText'>;

type InnerProps = TinyTextProps & WithInnerComponentThemeProps<TextTheme>;
const TinyTextComponent: React.FC<InnerProps> = ({ theme, ...textProps }) => (
  <TextBase {...textProps} {...theme} />
);

export const TinyText = setDisplayName<TinyTextProps>('TinyText')(
  compose<InnerProps, TinyTextProps>(
    pure,
    withComponentTheme('TinyText'),
  )(TinyTextComponent),
);
