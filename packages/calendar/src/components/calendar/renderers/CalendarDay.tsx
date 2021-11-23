import { Box, Clickable, Text } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import styled from "@emotion/styled";
import {
  CalendarDayProps,
  DayState,
  DayStateHighlight,
} from "../../../types/CalendarTypes";
import { dayHighlightSelect } from "../../../util/calendar/StateHelper";
import { isAfter, isBefore } from "date-fns";

export const CalendarDay = function CalendarDay<T extends {}>({
  day,
  week,
  month,
  dayState,
  userData,
  onClickDay,
  theme,
  extraDayContent: ExtraDayContent,
  defaultHighlights,
  minDate,
  maxDate,
}: CalendarDayProps<T>) {
  const isBeforeMinDate = useMemo(() => {
    if (!minDate) {
      return false;
    }
    return isBefore(day.date, minDate);
  }, [day.date, minDate]);

  const isAfterMaxDate = useMemo(() => {
    if (!maxDate) {
      return false;
    }
    return isAfter(day.date, maxDate);
  }, [day.date, maxDate]);

  const disabledByMinMax = isBeforeMinDate || isAfterMaxDate;

  const activeDayState = useMemo(
    () =>
      disabledByMinMax
        ? { highlights: [...(dayState?.highlights ?? []), "disabled"] }
        : dayState,
    [dayState, disabledByMinMax]
  );

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
            activeDayState,
            day,
            week,
            month,
            userData
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
        activeDayState,
        day,
        week,
        month,
        userData
      )),
  });

  const InnerWrapperDiv = styled.div({
    ...(theme.CalendarDay.innerWrapperStyle &&
      theme.CalendarDay.innerWrapperStyle(
        defaultHighlights,
        activeDayState,
        day,
        week,
        month,
        userData
      )),
    width: "100%",
    height: "100%",
  });

  const CellWrapperDiv = styled.div({
    ...(theme.CalendarDay.cellWrapperStyle &&
      theme.CalendarDay.cellWrapperStyle(
        defaultHighlights,
        activeDayState,
        day,
        week,
        month,
        userData
      )),
    width: "100%",
    height: "100%",
    position: "relative",
  });

  return (
    <WrapperTd>
      <InnerWrapperDiv>
        <CellWrapperDiv>
          {day.month === month.monthInYear && (
            <>
              {ExtraDayContent && (
                <ExtraDayContent
                  week={week}
                  month={month}
                  day={day}
                  dayState={activeDayState}
                  theme={theme}
                  userData={userData}
                />
              )}
              {onClickDay && isClickable(defaultHighlights, activeDayState) ? (
                <Clickable
                  onClick={(ev) => onClickDay(day, userData, ev)}
                  style={{ width: "100%", height: "100%" }}
                  borderRadius={"var(--swui-calendar-day-border-radius)"}
                >
                  {content}
                </Clickable>
              ) : (
                <>{content}</>
              )}
            </>
          )}
        </CellWrapperDiv>
      </InnerWrapperDiv>
    </WrapperTd>
  );
};

const isClickable = (
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined
): boolean =>
  !!dayHighlightSelect<boolean>(
    dayState,
    defaultHighlights,
    ["enabled", "disabled"],
    [true, false],
    true
  );
