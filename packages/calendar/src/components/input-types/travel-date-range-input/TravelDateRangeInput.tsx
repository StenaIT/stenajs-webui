import * as React from "react";
import {
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Heading,
  HeadingVariant,
  useOnClickOutside,
} from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputFields } from "../../../features/travel-calendar/components/TravelDateTextInputFields";
import { CardBody } from "@stenajs-webui/elements";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateRangeInput } from "../../../features/travel-calendar/hooks/UseTravelDateRangeInput";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import {
  TravelCalendar,
  TravelCalendarSizeVariant,
} from "../../../features/travel-calendar/components/TravelCalendar";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";
import styles from "./TravelDateRangeInput.module.css";
import cx from "classnames";

export interface RenderBelowCalendarArgs {
  hideCalendar: () => void;
}

export interface TravelDateRangeInputProps
  extends ValueAndOnValueChangeProps<TravelDateRangeInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
  heading?: string;
  headingLevel?: HeadingVariant;
  firstMonthInMonthPicker?: Date;
  numMonthsInMonthPicker?: number;
  zIndex?: number;
  zIndexWhenClosed?: number;
  onHideCalendar?: () => void;
  renderBelowCalendar?: (args: RenderBelowCalendarArgs) => ReactNode;
  size?: TravelCalendarSizeVariant;
  dateTestId?: (date: Date) => string | undefined;
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
  heading,
  headingLevel,
  numMonthsInMonthPicker = 12,
  firstMonthInMonthPicker = new Date(),
  zIndex = 1000,
  zIndexWhenClosed,
  onHideCalendar,
  renderBelowCalendar,
  size = "medium",
  dateTestId,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarInDom, setCalendarInDom] = useState(false);
  const [boxSize, setBoxSize] = useState<{ height: number; width: number }>({
    // Sane defaults, this will be updated with actual data from DOM.
    width: 336,
    height: 66,
  });

  const inputFieldsHeight = size === "large" ? "8.8rem" : "6.6rem";

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
    onHideCalendar?.();

    setTimeout(() => {
      if (!calendarOpenRef.current) {
        setCalendarInDom(false);
      }
    }, 120);
  }, [calendarInDom, onHideCalendar]);

  const ref = useRef<HTMLDivElement>(null);
  const sizeSourceRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, hideCalendar);

  useLayoutEffect(() => {
    const width = sizeSourceRef.current?.offsetWidth;
    const height = sizeSourceRef.current?.offsetHeight;
    if (width != null && height != null) {
      if (boxSize.height !== height || boxSize.width !== width) {
        setBoxSize({ width, height });
      }
    }
  }, [boxSize.height, boxSize.width]);

  const inputProps = useTravelDateRangeInput(
    value,
    onValueChange,
    localeCode,
    initialMonthInFocus
  );

  const {
    visiblePanel,
    visibleMonth,
    onValueChangeByInputs,
    setVisibleMonth,
    setVisiblePanel,
    monthPickerButtonRef,
  } = inputProps;

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
      height={boxSize.height}
      width={boxSize.width}
    >
      <Box
        position={"absolute"}
        ref={sizeSourceRef}
        zIndex={calendarInDom ? zIndex : zIndexWhenClosed}
      >
        <TravelDateTextInputFields
          value={value}
          onValueChange={onValueChangeByInputs}
          localeCode={localeCode}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          onFocus={showCalendar}
          calendarSize={size}
        />
      </Box>

      {calendarInDom && (
        <Box
          position={"absolute"}
          zIndex={zIndex - 1}
          left={"-2.4rem"}
          top={heading ? "-8.0rem" : "-2.4rem"}
          className={cx(styles.overlay, calendarOpen && styles.calendarVisible)}
        >
          <Box
            background={"white"}
            shadow={"popover"}
            borderRadius={"var(--swui-border-radius-large)"}
          >
            <CardBody gap={3}>
              {heading && (
                <Heading variant={"h2"} as={headingLevel}>
                  {heading}
                </Heading>
              )}

              <Box height={inputFieldsHeight} />

              <MonthHeader
                {...inputProps}
                previousMonthButtonAriaLabel={previousMonthButtonAriaLabel}
                nextMonthButtonAriaLabel={nextMonthButtonAriaLabel}
                calendarSize={size}
              />

              {visiblePanel === "calendar" && (
                <TravelCalendar
                  {...inputProps}
                  size={size}
                  multiSelectable={true}
                  dateTestId={dateTestId}
                />
              )}

              {visiblePanel === "month-picker" && (
                <MonthPicker
                  firstMonth={firstMonthInMonthPicker}
                  numMonths={numMonthsInMonthPicker}
                  value={visibleMonth}
                  size={size}
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
              {renderBelowCalendar?.({ hideCalendar })}
            </CardBody>
          </Box>
        </Box>
      )}
    </Box>
  );
};
