import { Box, Clickable, StandardText } from "@stenajs-webui/core";
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
  const content = (
    <Box
      width={theme.width}
      height={theme.height}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {background && <Box position={"absolute"}>{background}</Box>}
      <Box position={"absolute"}>
        <StandardText
          color={
            onClickWeek
              ? theme.WeekNumber.clickableTextColor
              : theme.WeekNumber.textColor
          }
        >
          {prefix}
          {week.weekNumber}
        </StandardText>
      </Box>
    </Box>
  );
  return (
    <Box
      background={backgroundColor || theme.WeekNumber.backgroundColor}
      position={"relative"}
    >
      {onClickWeek ? (
        <Clickable
          borderRadius={"var(--swui-calendar-day-border-radius)"}
          onClick={(ev) => onClickWeek(week, ev)}
          disableFocusHighlight={!onClickWeek}
        >
          {content}
        </Clickable>
      ) : (
        content
      )}
    </Box>
  );
};
