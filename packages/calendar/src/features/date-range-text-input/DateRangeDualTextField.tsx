import * as React from "react";
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

interface Props {
  valueLeft?: TextInputProps["value"];
  valueRight?: TextInputProps["value"];
  onValueChangeLeft?: TextInputProps["onValueChange"];
  onValueChangeRight?: TextInputProps["onValueChange"];
  onClickCalendar?: ButtonProps["onClick"];
  onClickArrowDown?: ButtonProps["onClick"];
  onFocusLeft?: TextInputProps["onFocus"];
  onFocusRight?: TextInputProps["onFocus"];
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
}) => {
  return (
    <Box width={"250px"}>
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
        <TextInput
          hideBorder
          placeholder={"Start date"}
          value={valueLeft}
          onValueChange={onValueChangeLeft}
          onBlur={onBlurLeft}
          onFocus={onFocusLeft}
          inputRef={inputRefLeft}
        />
        <Icon
          icon={faLongArrowAltRight}
          size={12}
          color={"var(--lhds-color-ui-500)"}
        />
        <TextInput
          hideBorder
          placeholder={"End date"}
          value={valueRight}
          onValueChange={onValueChangeRight}
          onBlur={onBlurRight}
          onFocus={onFocusRight}
          inputRef={inputRefRight}
        />
      </TextInputBox>
    </Box>
  );
};
