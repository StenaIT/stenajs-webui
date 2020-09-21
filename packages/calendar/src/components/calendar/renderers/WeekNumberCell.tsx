import { Box, Clickable, SmallText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { OnClickWeek } from "../../../types/CalendarTypes";
import { WeekData } from "../../../util/calendar/CalendarDataFactory";
import { CalendarTheme } from "../CalendarTheme";

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
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.WeekNumber.backgroundColor,
        textColor: theme.WeekNumber.textColor,
      },
    },
    [theme]
  );

  return (
    <Box
      background={backgroundColor || colors.backgroundColor}
      position={"relative"}
    >
      <Clickable
        onClick={onClickWeek ? (ev) => onClickWeek(week, ev) : undefined}
        disableFocusHighlight={!onClickWeek}
      >
        <Box
          width={theme.width}
          height={theme.height}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {background && <Box position={"absolute"}>{background}</Box>}
          <Box position={"absolute"}>
            <SmallText color={colors.textColor}>
              {prefix}
              {week.weekNumber}
            </SmallText>
          </Box>
        </Box>
      </Clickable>
    </Box>
  );
};
