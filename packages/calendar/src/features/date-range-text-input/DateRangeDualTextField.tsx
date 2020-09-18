import * as React from "react";
import { useCallback, useRef } from "react";
import { TextInput, TextInputBox, TextInputProps } from "@stenajs-webui/forms";
import {
  Box,
  ButtonProps,
  Indent,
  Row,
  SeparatorLine,
} from "@stenajs-webui/core";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons/faCalendarAlt";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons/faLongArrowAltRight";
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
  onBlur,
}) => {
  const focusCounter = useRef(0);

  const tryTriggerOnBlur = useCallback(
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
    [onFocusLeft, focusCounter]
  );

  const focusRightHandler = useCallback(
    (ev) => {
      focusCounter.current++;
      tryTriggerOnBlur(focusCounter.current);
      if (onFocusRight) {
        onFocusRight(ev);
      }
    },
    [onFocusRight, focusCounter]
  );

  const blurLeftHandler = useCallback(
    (ev) => {
      focusCounter.current--;
      tryTriggerOnBlur(focusCounter.current);
      if (onBlurLeft) {
        onBlurLeft(ev);
      }
    },
    [onBlurLeft, focusCounter]
  );

  const blurRightHandler = useCallback(
    (ev) => {
      focusCounter.current--;
      tryTriggerOnBlur(focusCounter.current);
      if (onBlurRight) {
        onBlurRight(ev);
      }
    },
    [onBlurRight, focusCounter]
  );

  return (
    <Box>
      <TextInputBox
        disableContentPaddingRight
        contentRight={
          <Row alignItems={"center"}>
            <Indent num={0.5}>
              <FlatButton
                leftIcon={faCalendarAlt}
                onClick={onClickCalendar}
                size={"small"}
              />
            </Indent>

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
            type={"date"}
          />
        </Box>
        <Icon
          icon={faLongArrowAltRight}
          size={12}
          color={"var(--lhds-color-ui-500)"}
        />
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
            type={"date"}
          />
        </Box>
      </TextInputBox>
    </Box>
  );
};
