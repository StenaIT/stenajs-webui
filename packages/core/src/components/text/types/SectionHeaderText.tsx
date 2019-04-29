import * as React from 'react';
import { compose, pure, setDisplayName } from 'recompose';
import {
  ComponentThemeProps,
  withComponentTheme,
  WithInnerComponentThemeProps,
} from '../../util/enhancers/WithComponentTheme';
import { TextBase, TextBaseSharedProps } from './TextBase';
import { TextTheme } from './TextTheme';

export type SectionHeaderTextProps = TextBaseSharedProps &
  ComponentThemeProps<'SectionHeaderText'>;

type InnerProps = SectionHeaderTextProps &
  WithInnerComponentThemeProps<TextTheme>;
const SectionHeaderTextComponent: React.FC<InnerProps> = ({
  theme,
  ...textProps
}) => <TextBase {...textProps} {...theme} />;

export const SectionHeaderText = setDisplayName<SectionHeaderTextProps>(
  'SectionHeaderText',
)(
  compose<InnerProps, SectionHeaderTextProps>(
    pure,
    withComponentTheme('SectionHeaderText'),
  )(SectionHeaderTextComponent),
);
