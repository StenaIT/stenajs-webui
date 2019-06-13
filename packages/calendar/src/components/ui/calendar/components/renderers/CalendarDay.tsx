import { Box, Clickable, StandardText, useTheme } from "@stenajs-webui/core";
import * as React from "react";
import {
  CalendarDayProps,
  DayState,
  DayStateHighlight
} from "../../types/CalendarTypes";
import { dayHighlightSelect } from "../../util/StateHelper";

export const CalendarDay = <T extends {}>({
  day,
  week,
  month,
  dayState,
  userData,
  onClickDay,
  theme,
  extraDayContent: ExtraDayContent,
  defaultHighlights
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
        {...theme.CalendarDay.textProps &&
          theme.CalendarDay.textProps(
            fullTheme,
            defaultHighlights,
            dayState,
            day,
            week,
            month,
            userData
          )}
      >
        {day.dayOfMonth}
      </StandardText>
    </Box>
  );

  return (
    <td
      style={{
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
        height: theme.height
      }}
    >
      <div
        style={{
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
          height: "100%"
        }}
      >
        <div
          style={{
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
            position: "relative"
          }}
        >
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
                  onClick={() => onClickDay(day, userData)}
                  style={{ width: "100%", height: "100%" }}
                >
                  {content}
                </Clickable>
              ) : (
                <>{content}</>
              )}
            </>
          )}
        </div>
      </div>
    </td>
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
