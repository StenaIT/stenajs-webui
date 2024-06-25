import * as React from "react";
import {
  LabelledTextInput,
  LabelledTextInputProps,
} from "@stenajs-webui/forms";
import { useRef } from "react";
import {
  InputMask,
  InputMaskPipe,
  InputMaskProvider,
  useMaskedInput,
} from "@stenajs-webui/input-mask";

export interface TravelDateTextInputProps extends LabelledTextInputProps {
  mask: InputMask | InputMaskProvider;
  pipe?: InputMaskPipe;
  guide?: boolean;
  keepCharPositions?: boolean;
  placeholderChar?: string;
  showMask?: boolean;
}

export const TravelDateTextInput: React.FC<TravelDateTextInputProps> = ({
  onChange,
  onValueChange,
  mask,
  pipe,
  value,
  guide,
  keepCharPositions,
  placeholderChar,
  showMask,
  ...inputProps
}) => {
  const inputRef = useRef(null);
  const { onChange: maskedOnChange } = useMaskedInput(
    inputRef,
    onChange,
    onValueChange,
    mask,
    pipe,
    value,
    guide,
    keepCharPositions,
    placeholderChar,
    showMask
  );

  return (
    <LabelledTextInput
      {...inputProps}
      ref={inputRef}
      onChange={maskedOnChange}
    />
  );
};
