import * as React from 'react';
import { Background } from '../../../../colors';
import { ClickableSwitcher } from '../../../../interaction/ClickableSwitcher';
import { Column } from '../../../../layout';
import { Absolute, Relative } from '../../../../positioning';
import { SmallText } from '../../../../text';
import { WeekData } from '../../util/CalendarDataFactory';
import { OnClickWeek } from '../../types/CalendarTypes';
import { CalendarTheme } from '../CalendarTheme';

export interface WeekNumberCellProps {
  week: WeekData;
  onClickWeek?: OnClickWeek;
  theme: CalendarTheme;
  background?: JSX.Element;
  prefix?: string;
  backgroundColor?: string;
}

export const WeekNumberCell: React.FC<WeekNumberCellProps> = ({
  onClickWeek,
  theme,
  week,
  background,
  backgroundColor,
  prefix,
}) => (
  <Background color={backgroundColor || theme.WeekNumber.backgroundColor}>
    <Relative>
      <ClickableSwitcher
        onClick={onClickWeek ? () => onClickWeek(week) : undefined}
      >
        <Column
          width={theme.width}
          height={theme.height}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {background && <Absolute>{background}</Absolute>}
          <Absolute>
            <SmallText color={theme.WeekNumber.textColor}>
              {prefix}
              {week.weekNumber}
            </SmallText>
          </Absolute>
        </Column>
      </ClickableSwitcher>
    </Relative>
  </Background>
);
