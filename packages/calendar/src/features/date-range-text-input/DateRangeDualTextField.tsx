import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import {
  TextInput,
  TextInputBox,
  TextInputBoxProps,
  TextInputProps,
} from "@stenajs-webui/forms";
import {
  Box,
  ButtonProps,
  Indent,
  Row,
  SeparatorLine,
  Space,
} from "@stenajs-webui/core";
import { FlatButton, Icon, stenaArrowRight } from "@stenajs-webui/elements";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons/faCalendarAlt";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { debounce } from "lodash";

interface Props {
  valueLeft?: TextInputProps["value"];
  valueRight?: TextInputProps["value"];
  onValueChangeLeft?: TextInputProps["onValueChange"];
  onValueChangeRight?: TextInputProps["onValueChange"];
  onChangeLeft?: TextInputProps["onChange"];
  onChangeRight?: TextInputProps["onChange"];
  onClickCalendar?: ButtonProps["onClick"];
  onClickArrowDown?: ButtonProps["onClick"];
  onFocusLeft?: TextInputProps["onFocus"];
  onFocusRight?: TextInputProps["onFocus"];
  onBlur?: () => void;
  onBlurLeft?: TextInputProps["onBlur"];
  onBlurRight?: TextInputProps["onBlur"];
  inputRefLeft?: TextInputProps["inputRef"];
  inputRefRight?: TextInputProps["inputRef"];
  variantLeft?: TextInputProps["variant"];
  variantRight?: TextInputProps["variant"];
  variant?: TextInputBoxProps["variant"];
  showPresets?: false;
}

export const DateRangeDualTextField: React.FC<Props> = ({
  onValueChangeLeft,
  onValueChangeRight,
  onChangeLeft,
  onChangeRight,
  valueLeft,
  valueRight,
  onClickCalendar,
  onClickArrowDown,
  onBlurLeft,
  onBlurRight,
  onFocusLeft,
  onFocusRight,
  inputRefLeft,
  inputRefRight,
  variant,
  variantLeft,
  variantRight,
  onBlur,
  showPresets,
}) => {
  const focusCounter = useRef(0);

  const tryTriggerOnBlur = useMemo(
    () =>
      debounce((focusCounter: number) => {
        if (focusCounter === 0) {
          onBlur?.();
        }
      }, 10),
    [onBlur]
  );

  const focusLeftHandler = useCallback(
    (ev) => {
      focusCounter.current++;
      tryTriggerOnBlur(focusCounter.current);
      if (onFocusLeft) {
        onFocusLeft(ev);
      }
    },
    [onFocusLeft, focusCounter, tryTriggerOnBlur]
  );

  const focusRightHandler = useCallback(
    (ev) => {
      focusCounter.current++;
      tryTriggerOnBlur(focusCounter.current);
      if (onFocusRight) {
        onFocusRight(ev);
      }
    },
    [onFocusRight, focusCounter, tryTriggerOnBlur]
  );

  const blurLeftHandler = useCallback(
    (ev) => {
      focusCounter.current--;
      tryTriggerOnBlur(focusCounter.current);
      if (onBlurLeft) {
        onBlurLeft(ev);
      }
    },
    [onBlurLeft, focusCounter, tryTriggerOnBlur]
  );

  const blurRightHandler = useCallback(
    (ev) => {
      focusCounter.current--;
      tryTriggerOnBlur(focusCounter.current);
      if (onBlurRight) {
        onBlurRight(ev);
      }
    },
    [onBlurRight, focusCounter, tryTriggerOnBlur]
  );

  return (
    <Box>
      <TextInputBox
        disableContentPaddingRight
        variant={variant}
        contentRight={
          <Row alignItems={"center"}>
            <Indent num={0.5}>
              <FlatButton
                leftIcon={faCalendarAlt}
                onClick={onClickCalendar}
                size={"small"}
              />
            </Indent>

            {showPresets ? (
              <>
                <Row height={"22px"}>
                  <SeparatorLine vertical />
                </Row>

                <Indent num={0.5}>
                  <FlatButton
                    leftIcon={faAngleDown}
                    onClick={onClickArrowDown}
                    size={"small"}
                  />
                </Indent>
              </>
            ) : null}
          </Row>
        }
      >
        <Box width={"104px"}>
          <TextInput
            hideBorder
            placeholder={"Start date"}
            value={valueLeft}
            onValueChange={onValueChangeLeft}
            onChange={onChangeLeft}
            onBlur={blurLeftHandler}
            onFocus={focusLeftHandler}
            inputRef={inputRefLeft}
            variant={variantLeft}
            type={"date"}
          />
        </Box>
        <Icon
          icon={stenaArrowRight}
          size={12}
          color={"var(--lhds-color-ui-500)"}
        />
        <Space />
        <Box width={"104px"}>
          <TextInput
            hideBorder
            placeholder={"End date"}
            value={valueRight}
            onValueChange={onValueChangeRight}
            onChange={onChangeRight}
            onBlur={blurRightHandler}
            onFocus={focusRightHandler}
            inputRef={inputRefRight}
            variant={variantRight}
            type={"date"}
          />
        </Box>
      </TextInputBox>
    </Box>
  );
};
