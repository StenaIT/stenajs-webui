import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { DateRangeDualTextField } from "./DateRangeDualTextField";
import { Popover } from "@stenajs-webui/tooltip";
import {
  TextInputProps,
  ValueAndOnValueChangeProps
} from "@stenajs-webui/forms";
import { DateRangeOnChangeValue } from "../date-range/hooks/UseDateRangeOnClickDayHandler";
import { Column, StandardText } from "@stenajs-webui/core";
import { DateRangeFocusedInput } from "../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { DayData } from "../../util/calendar/CalendarDataFactory";
import { isAfter } from "date-fns";
import { CalendarWithMonthSwitcher } from "../month-switcher/CalendarWithMonthSwitcher";
import { buildDayState } from "../../components/calendar-types/date-range-calendar/util/DayStateFactory";

interface Props extends ValueAndOnValueChangeProps<DateRangeOnChangeValue> {}

type ModalMode = "calendar" | "presets";

export const DateRangeDualTextInput: React.FC<Props> = ({
  value,
  onValueChange
}) => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode | undefined>(undefined);
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const startDateInputRef: TextInputProps["inputRef"] = useRef(null);
  const endDateInputRef: TextInputProps["inputRef"] = useRef(null);

  const showCalendarStartDate = useCallback(() => {
    setFocusedInput("startDate");
    setModalMode("calendar");
    return true;
  }, [setFocusedInput, setModalMode]);

  const showCalendarEndDate = useCallback(() => {
    setFocusedInput("endDate");
    setModalMode("calendar");
    return true;
  }, [setFocusedInput, setModalMode]);

  const hideCalendar = useCallback(() => {
    setModalMode(undefined);
  }, [setModalMode]);

  const onClickDay = useCallback(
    (day: DayData) => {
      if (focusedInput === "startDate") {
        onValueChange?.({
          startDate: day.date,
          endDate: value?.endDate
        });
        if (!value || !value.endDate) {
          setFocusedInput("endDate");
          endDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 150);
        }
      } else if (focusedInput === "endDate") {
        onValueChange?.({
          startDate: value?.startDate,
          endDate: day.date
        });
        if (!value || value.startDate) {
          setFocusedInput("startDate");
          startDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 150);
        }
      }
    },
    [focusedInput, onValueChange, setFocusedInput, hideCalendar, value]
  );

  const startDateIsAfterEnd = useMemo(
    () =>
      value &&
      value.startDate &&
      value.endDate &&
      isAfter(value.startDate, value.endDate),
    [value && value.startDate, value && value.endDate]
  );

  const statePerMonth = useMemo(
    () => buildDayState(undefined, value?.startDate, value?.endDate),
    [value]
  );

  return (
    <Popover
      visible={!!modalMode}
      content={
        !!modalMode ? (
          <Column>
            {modalMode === "calendar" && (
              <CalendarWithMonthSwitcher
                startDateInFocus={
                  focusedInput === "startDate" || focusedInput === "endDate"
                    ? value?.[focusedInput]
                    : undefined
                }
                statePerMonth={statePerMonth}
                onClickDay={onClickDay}
              />
            )}
            {modalMode === "presets" && (
              <StandardText>Presets TODO</StandardText>
            )}
          </Column>
        ) : null
      }
    >
      <DateRangeDualTextField
        valueLeft={leftText}
        valueRight={rightText}
        onValueChangeLeft={setLeftText}
        onValueChangeRight={setRightText}
        onClickArrowDown={() => setModalMode("presets")}
        onClickCalendar={() => setModalMode("calendar")}
        onBlurLeft={() => {
          setFocusedInput("startDate");
          setModalMode("calendar");
        }}
        onBlurRight={() => {
          setFocusedInput("endDate");
          setModalMode("calendar");
        }}
        onFocusLeft={showCalendarStartDate}
        onFocusRight={showCalendarEndDate}
        inputRefLeft={startDateInputRef}
        inputRefRight={endDateInputRef}
        variantLeft={startDateIsAfterEnd ? "error" : undefined}
        variantRight={startDateIsAfterEnd ? "error" : undefined}
      />
    </Popover>
  );
};
