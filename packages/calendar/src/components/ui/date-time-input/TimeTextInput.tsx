import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { useTheme } from "@stenajs-webui/core";
import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useState } from "react";
import { Omit } from "../../../../../core/src/types/Omit";
import {
  formatTimeString,
  validUserInput
} from "../../../util/time/TimeStringFormatValidator";

interface TimeTextInputProps extends Omit<StandardTextInputProps, "onChange"> {
  /** Show placeholder when true */
  showPlaceholder?: boolean;
  /** Show icon when true */
  useIcon?: boolean;
}

export const TimeTextInput: React.FC<TimeTextInputProps> = ({
  onValueChange,
  showPlaceholder = true,
  useIcon = true,
  value,
  width = "85px",
  ...props
}) => {
  const [valid, setValid] = useState(() => validUserInput(value));

  const timeFormat = "hh:mm";

  const theme = useTheme();

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
    ev => {
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
    <StandardTextInput
      {...props}
      backgroundColor={valid ? undefined : theme.colors.errorBgLight}
      iconLeft={useIcon ? faClock : undefined}
      value={value}
      placeholder={showPlaceholder ? timeFormat : undefined}
      onChange={onChangeHandler}
      onBlur={onBlur}
      width={width}
    />
  );
};
