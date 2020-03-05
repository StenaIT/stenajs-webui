import {
  TextInput,
  TextInputProps
} from "@stenajs-webui/forms";
import * as React from "react";
import { useRef } from "react";
import { useMaskedInput } from "../hooks/UseInputMask";
import {
  InputMask,
  InputMaskPipe,
  InputMaskProvider
} from "../masks/InputMask";

export interface MaskedTextInputProps extends TextInputProps {
  mask: InputMask | InputMaskProvider;
  pipe?: InputMaskPipe;
  guide?: boolean;
  keepCharPositions?: boolean;
  placeholderChar?: string;
  showMask?: boolean;
}

export const MaskedTextInput: React.FC<MaskedTextInputProps> = ({
  mask,
  pipe,
  onChange,
  onValueChange,
  value,
  guide,
  keepCharPositions,
  placeholderChar,
  showMask,
  ...textInputProps
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
    <TextInput
      {...textInputProps}
      onChange={maskedOnChange}
      value={value}
      inputRef={inputRef}
    />
  );
};
