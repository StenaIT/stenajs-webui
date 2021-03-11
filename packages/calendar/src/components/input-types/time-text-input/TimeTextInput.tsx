import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { Omit } from "@stenajs-webui/core";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  formatTimeString,
  validUserInput,
} from "../../../util/time/TimeStringFormatValidator";

export interface TimeTextInputProps extends Omit<TextInputProps, "onChange"> {
  /** Show placeholder when true */
  showPlaceholder?: boolean;
  /** Show icon when true */
  useIcon?: boolean;
  /** Variant of the input field. */
  variant?: TextInputProps["variant"];
}

/**
 * @deprecated
 */
export const TimeTextInput: React.FC<TimeTextInputProps> = ({
  onValueChange,
  showPlaceholder = true,
  useIcon = true,
  value,
  width = "85px",
  variant,
  ...props
}) => {
  const [valid, setValid] = useState(() => validUserInput(value));

  const timeFormat = "hh:mm";

  const onBlur = useCallback(() => {
    if (value) {
      const formattedResult = formatTimeString(value);
      setValid(formattedResult.success);
      if (formattedResult.success) {
        if (onValueChange) {
          onValueChange(formattedResult.time);
        }
      }
    }
  }, [value, onValueChange, setValid]);

  const onChangeHandler = useCallback(
    (ev) => {
      const time = ev.target.value;
      const validInput = validUserInput(time);

      setValid(validInput && time.length <= timeFormat.length);

      if (onValueChange) {
        onValueChange(time);
      }
    },
    [onValueChange, setValid]
  );

  return (
    <TextInput
      {...props}
      type={"time"}
      variant={!valid ? "error" : variant}
      iconLeft={useIcon ? faClock : undefined}
      value={value}
      placeholder={showPlaceholder ? timeFormat : undefined}
      onChange={onChangeHandler}
      onBlur={onBlur}
      width={width}
    />
  );
};
