import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { formatTimeString, validUserInput } from '../../../../util/time';
import { useTheme } from '../../../theme/UseThemeHook';
import {
  DefaultTextInput,
  DefaultTextInputProps,
} from '../text-input/StandardTextInput';

interface TimeTextInputProps extends DefaultTextInputProps {
  /** Show placeholder when true */
  showPlaceholder?: boolean;
  /** Show icon when true */
  useIcon?: boolean;
}

export const TimeTextInput: React.FC<TimeTextInputProps> = ({
  onChange,
  showPlaceholder = true,
  useIcon = true,
  value,
  width = '85px',
  ...props
}) => {
  const [valid, setValid] = useState(() => validUserInput(value));

  const timeFormat = 'hh:mm';

  const theme = useTheme();

  const onBlur = useCallback(
    () => {
      if (value) {
        const formattedResult = formatTimeString(value);
        setValid(formattedResult.success);
        if (formattedResult.success) {
          if (onChange) {
            onChange(formattedResult.time);
          }
        }
      }
    },
    [value, onChange, setValid],
  );

  const updateValue = useCallback(
    (time: string) => {
      const validInput = validUserInput(time);

      setValid(validInput && time.length <= timeFormat.length);

      if (onChange) {
        onChange(time);
      }
    },
    [onChange, setValid],
  );

  return (
    <DefaultTextInput
      {...props}
      backgroundColor={valid ? undefined : theme.colors.errorBgLight}
      iconLeft={useIcon ? faClock : undefined}
      value={value}
      placeholder={showPlaceholder ? timeFormat : undefined}
      onChange={updateValue}
      onBlur={onBlur}
      width={width}
    />
  );
};
