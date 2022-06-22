import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons/faCalendarAlt";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {
  Box,
  BoxProps,
  ButtonElementProps,
  Indent,
  Row,
  SeparatorLine,
} from "@stenajs-webui/core";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import {
  TextInput,
  TextInputBox,
  TextInputBoxProps,
  TextInputProps,
} from "@stenajs-webui/forms";
import { debounce } from "lodash";
import * as React from "react";
import { FocusEventHandler, useCallback, useMemo, useRef } from "react";
import { cssColor } from "@stenajs-webui/theme";

export interface DualTextInputProps {
  onEsc?: TextInputProps["onEsc"];
  onEnter?: TextInputProps["onEnter"];
  widthLeft?: BoxProps["width"];
  widthRight?: BoxProps["width"];
  valueLeft?: TextInputProps["value"];
  valueRight?: TextInputProps["value"];
  minLeft?: string;
  maxLeft?: string;
  minRight?: string;
  maxRight?: string;
  typeLeft?: TextInputProps["type"];
  typeRight?: TextInputProps["type"];
  separatorIcon?: IconDefinition;
  placeholderLeft?: TextInputProps["placeholder"];
  placeholderRight?: TextInputProps["placeholder"];
  onValueChangeLeft?: TextInputProps["onValueChange"];
  onValueChangeRight?: TextInputProps["onValueChange"];
  onChangeLeft?: TextInputProps["onChange"];
  onChangeRight?: TextInputProps["onChange"];
  onClickLeft?: TextInputProps["onClick"];
  onClickRight?: TextInputProps["onClick"];
  onClickCalendar?: ButtonElementProps["onClick"];
  onClickArrowDown?: ButtonElementProps["onClick"];
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
  autoFocusLeft?: boolean;
  autoFocusRight?: boolean;
  disabled?: boolean;
}

export const DualTextInput: React.FC<DualTextInputProps> = ({
  autoFocusLeft,
  autoFocusRight,
  onEsc,
  onEnter,
  onValueChangeLeft,
  onValueChangeRight,
  separatorIcon,
  placeholderLeft,
  placeholderRight,
  typeLeft,
  typeRight,
  onChangeLeft,
  onChangeRight,
  valueLeft,
  valueRight,
  minLeft,
  maxLeft,
  minRight,
  maxRight,
  onClickLeft,
  onClickRight,
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
  widthLeft,
  widthRight,
  disabled,
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

  const focusLeftHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
    (ev) => {
      focusCounter.current++;
      tryTriggerOnBlur(focusCounter.current);
      if (onFocusLeft) {
        onFocusLeft(ev);
      }
    },
    [onFocusLeft, focusCounter, tryTriggerOnBlur]
  );

  const focusRightHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
    (ev) => {
      focusCounter.current++;
      tryTriggerOnBlur(focusCounter.current);
      if (onFocusRight) {
        onFocusRight(ev);
      }
    },
    [onFocusRight, focusCounter, tryTriggerOnBlur]
  );

  const blurLeftHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
    (ev) => {
      focusCounter.current--;
      tryTriggerOnBlur(focusCounter.current);
      if (onBlurLeft) {
        onBlurLeft(ev);
      }
    },
    [onBlurLeft, focusCounter, tryTriggerOnBlur]
  );

  const blurRightHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
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
        disabled={disabled}
        variant={variant}
        contentRight={
          <Row alignItems={"center"}>
            <Indent num={0.5}>
              <FlatButton
                leftIcon={faCalendarAlt}
                onClick={onClickCalendar}
                disabled={disabled}
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
                    disabled={disabled}
                    size={"small"}
                  />
                </Indent>
              </>
            ) : null}
          </Row>
        }
      >
        <Box width={widthLeft}>
          <TextInput
            onEsc={onEsc}
            onEnter={onEnter}
            onClick={onClickLeft}
            disabled={disabled}
            hideBorder
            placeholder={placeholderLeft}
            value={valueLeft}
            onValueChange={onValueChangeLeft}
            onChange={onChangeLeft}
            onBlur={blurLeftHandler}
            onFocus={focusLeftHandler}
            inputRef={inputRefLeft}
            variant={variantLeft}
            type={typeLeft}
            autoFocus={autoFocusLeft}
            min={minLeft}
            max={maxLeft}
          />
        </Box>
        <Row indent={0.5} alignItems={"center"} justifyContent={"center"}>
          <Icon
            icon={separatorIcon}
            size={12}
            color={cssColor("--lhds-color-ui-500")}
          />
        </Row>
        <Box width={widthRight}>
          <TextInput
            onEsc={onEsc}
            onEnter={onEnter}
            onClick={onClickRight}
            disabled={disabled}
            hideBorder
            placeholder={placeholderRight}
            value={valueRight}
            onValueChange={onValueChangeRight}
            onChange={onChangeRight}
            onBlur={blurRightHandler}
            onFocus={focusRightHandler}
            inputRef={inputRefRight}
            variant={variantRight}
            type={typeRight}
            autoFocus={autoFocusRight}
            min={minRight}
            max={maxRight}
          />
        </Box>
      </TextInputBox>
    </Box>
  );
};
