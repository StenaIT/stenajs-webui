import * as React from "react";
import {
  KeyboardEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box, Column, Heading, useOnClickOutside } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputs } from "../../../features/travel-calendar/components/TravelDateTextInputs";
import { CardBody } from "@stenajs-webui/elements";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateInput } from "../../../features/travel-calendar/hooks/UseTravelDateInput";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import { TravelCalendar } from "../../../features/travel-calendar/components/TravelCalendar";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";
import styles from "./TravelDateRangeInput.module.css";
import cx from "classnames";

export interface TravelDateRangeInputProps
  extends ValueAndOnValueChangeProps<TravelDateRangeInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
  heading?: string;
  zIndex?: number;
}

export const TravelDateRangeInput: React.FC<TravelDateRangeInputProps> = ({
  value,
  onValueChange,
  startDateLabel,
  endDateLabel,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
  heading = "Select dates",
  zIndex = 1000,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarInDom, setCalendarInDom] = useState(false);
  const [size, setSize] = useState<{ height: number; width: number }>({
    // Sane defaults, this will be updated with actual data from DOM.
    width: 336,
    height: 66,
  });

  const calendarOpenRef = useRef(false);

  const showCalendar = useCallback(() => {
    calendarOpenRef.current = true;
    setCalendarInDom(true);
    setTimeout(() => {
      setCalendarOpen(true);
    }, 10);
  }, []);

  const hideCalendar = useCallback(() => {
    if (!calendarInDom) {
      return;
    }

    setCalendarOpen(false);
    calendarOpenRef.current = false;
    setTimeout(() => {
      if (!calendarOpenRef.current) {
        setCalendarInDom(false);
      }
    }, 120);
  }, [calendarInDom]);

  const ref = useRef<HTMLDivElement>(null);
  const sizeSourceRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, hideCalendar);

  useLayoutEffect(() => {
    const width = sizeSourceRef.current?.offsetWidth;
    const height = sizeSourceRef.current?.offsetHeight;
    if (width != null && height != null) {
      if (size.height !== height || size.width !== width) {
        setSize({ width, height });
      }
    }
  }, [size.height, size.width]);

  const {
    monthPickerButtonRef,
    isDateDisabled,
    onClickDate,
    prevMonthDisabled,
    isValidDateRange,
    calendarId,
    onValueChangeByInputs,
    monthPickerButtonLabel,
    setVisiblePanel,
    visiblePanel,
    visibleMonthData,
    setVisibleMonth,
    setHoverDate,
    hoverDate,
    todayIsInVisibleMonth,
    selectedStartDate,
    selectedEndDate,
    today,
    visibleMonth,
  } = useTravelDateInput(value, onValueChange, localeCode, initialMonthInFocus);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (ev) => {
      if (ev.key === "Escape") {
        hideCalendar();
      }
    },
    [hideCalendar]
  );

  return (
    <Box
      position={"relative"}
      className={styles.travelDateRangeInput}
      ref={ref}
      onKeyDown={onKeyDown}
      height={size.height}
      width={size.width}
    >
      <Box position={"absolute"} ref={sizeSourceRef} zIndex={zIndex}>
        <TravelDateTextInputs
          value={value}
          onValueChange={onValueChangeByInputs}
          localeCode={localeCode}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          onFocus={showCalendar}
        />
      </Box>

      {calendarInDom && (
        <Box
          position={"absolute"}
          zIndex={zIndex - 1}
          left={-24}
          top={-80}
          className={cx(styles.overlay, calendarOpen && styles.calendarVisible)}
        >
          <Box
            background={"white"}
            shadow={"popover"}
            borderRadius={"var(--swui-border-radius-large)"}
          >
            <CardBody>
              <Column gap={3}>
                <Heading variant={"h2"}>{heading}</Heading>
                <Box height={"68px"} />
                <MonthHeader
                  setVisibleMonth={setVisibleMonth}
                  setVisiblePanel={setVisiblePanel}
                  visiblePanel={visiblePanel}
                  previousMonthButtonAriaLabel={previousMonthButtonAriaLabel}
                  monthPickerButtonLabel={monthPickerButtonLabel}
                  monthPickerButtonRef={monthPickerButtonRef}
                  nextMonthButtonAriaLabel={nextMonthButtonAriaLabel}
                  prevMonthDisabled={prevMonthDisabled}
                />

                {visiblePanel === "calendar" && (
                  <TravelCalendar
                    calendarId={calendarId}
                    isDateDisabled={isDateDisabled}
                    hoverDate={hoverDate}
                    today={today}
                    setHoverDate={setHoverDate}
                    onClickDate={onClickDate}
                    visibleMonthData={visibleMonthData}
                    setVisibleMonth={setVisibleMonth}
                    isValidDateRange={isValidDateRange}
                    selectedEndDate={selectedEndDate}
                    selectedStartDate={selectedStartDate}
                    todayIsInVisibleMonth={todayIsInVisibleMonth}
                    visibleMonth={visibleMonth}
                  />
                )}

                {visiblePanel === "month-picker" && (
                  <MonthPicker
                    firstMonth={new Date()}
                    numMonths={12}
                    value={visibleMonth}
                    onValueChange={(v) => {
                      setVisibleMonth(v);
                      setVisiblePanel("calendar");
                      monthPickerButtonRef.current?.focus();
                    }}
                    onCancel={() => {
                      setVisiblePanel("calendar");
                      monthPickerButtonRef.current?.focus();
                    }}
                  />
                )}
              </Column>
            </CardBody>
          </Box>
        </Box>
      )}
    </Box>
  );
};
