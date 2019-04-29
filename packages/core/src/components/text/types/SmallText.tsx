import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type SmallTextProps = TextBaseSharedProps &
  ComponentThemeProps<'SmallText'>;

type InnerProps = SmallTextProps & WithInnerComponentThemeProps<TextTheme>;
const SmallTextComponent: React.FC<InnerProps> = ({ theme, ...textProps }) => (
  <TextBase {...textProps} {...theme} />
);

export const SmallText = setDisplayName<SmallTextProps>('SmallText')(
  compose<InnerProps, SmallTextProps>(
    pure,
    withComponentTheme('SmallText'),
  )(SmallTextComponent),
);
