import { Box, Clickable, StandardText, useTheme } from "@stenajs-webui/core";
import * as React from "react";
import styled from "@emotion/styled";
import {
  CalendarDayProps,
  DayState,
  DayStateHighlight,
} from "../../../types/CalendarTypes";
import { dayHighlightSelect } from "../../../util/calendar/StateHelper";

export const CalendarDay = <T extends {}>({
  day,
  week,
  month,
  dayState,
  userData,
  onClickDay,
  theme,
  extraDayContent: ExtraDayContent,
  defaultHighlights,
}: CalendarDayProps<T>) => {
  const fullTheme = useTheme();

  const content = (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <StandardText
        {...(theme.CalendarDay.textProps &&
          theme.CalendarDay.textProps(
            fullTheme,
            defaultHighlights,
            dayState,
            day,
            week,
            month,
            userData
          ))}
      >
        {day.dayOfMonth}
      </StandardText>
    </Box>
  );

  const WrapperTd = styled.td({
    ...(theme.CalendarDay.wrapperStyle &&
      theme.CalendarDay.wrapperStyle(
        fullTheme,
        defaultHighlights,
        dayState,
        day,
        week,
        month,
        userData
      )),
    width: theme.width,
    height: theme.height,
  });

  const InnerWrapperDiv = styled.div({
    ...(theme.CalendarDay.innerWrapperStyle &&
      theme.CalendarDay.innerWrapperStyle(
        fullTheme,
        defaultHighlights,
        dayState,
        day,
        week,
        month,
        userData
      )),
    width: "100%",
    height: theme.height,
  });

  const CellWrapperDiv = styled.div({
    ...(theme.CalendarDay.cellWrapperStyle &&
      theme.CalendarDay.cellWrapperStyle(
        fullTheme,
        defaultHighlights,
        dayState,
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
                  dayState={dayState}
                  theme={theme}
                  userData={userData}
                />
              )}
              {onClickDay && isClickable(defaultHighlights, dayState) ? (
                <Clickable
                  onClick={(ev) => onClickDay(day, userData, ev)}
                  style={{ width: "100%", height: "100%" }}
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
