import styled from "@emotion/styled";
import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import {
  CalendarDayProps,
  DayState,
  DayStateHighlight,
} from "../../../types/CalendarTypes";
import { dayHighlightSelect } from "../../../util/calendar/StateHelper";

export const CalendarDay = function CalendarDay<T>({
  day,
  week,
  month,
  dayState,
  userData,
  onClickDay,
  theme,
  extraDayContent: ExtraDayContent,
  defaultHighlights,
}: CalendarDayProps<T>) {
  const content = (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        {...(theme.CalendarDay.textProps &&
          theme.CalendarDay.textProps(
            defaultHighlights,
            dayState,
            day,
            week,
            month,
            userData,
          ))}
      >
        {day.dayOfMonth}
      </Text>
    </Box>
  );

  const WrapperTd = styled.td({
    ...(theme.CalendarDay.tdStyle &&
      theme.CalendarDay.tdStyle(
        defaultHighlights,
        dayState,
        day,
        week,
        month,
        userData,
      )),
  });

  const InnerWrapperDiv = styled.div({
    ...(theme.CalendarDay.innerWrapperStyle &&
      theme.CalendarDay.innerWrapperStyle(
        defaultHighlights,
        dayState,
        day,
        week,
        month,
        userData,
      )),
    width: "100%",
    height: "100%",
  });

  const CellWrapperDiv = styled.div({
    ...(theme.CalendarDay.cellWrapperStyle &&
      theme.CalendarDay.cellWrapperStyle(
        defaultHighlights,
        dayState,
        day,
        week,
        month,
        userData,
      )),
    width: "100%",
    height: "100%",
    position: "relative",
  });

  const disabled = isDisabled(defaultHighlights, dayState);

  return (
    <WrapperTd
      onClick={disabled ? undefined : (ev) => onClickDay?.(day, userData, ev)}
    >
      <InnerWrapperDiv>
        <CellWrapperDiv>
          {day.month === month.monthInYear && (
            <>
              {ExtraDayContent && (
                <ExtraDayContent
                  week={week}
                  month={month}
                  day={day}
                  dayState={dayState}
                  theme={theme}
                  userData={userData}
                />
              )}
              {content}
            </>
          )}
        </CellWrapperDiv>
      </InnerWrapperDiv>
    </WrapperTd>
  );
};

const isDisabled = (
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined,
): boolean =>
  !!dayHighlightSelect<boolean>(
    dayState,
    defaultHighlights,
    ["disabled"],
    [true],
    false,
  );
