import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import * as React from "react";
import { useRef } from "react";
import { useMaskedInput } from "../hooks/UseInputMask";
import {
  InputMask,
  InputMaskPipe,
  InputMaskProvider
} from "../masks/InputMask";

export interface MaskedStandardTextInputProps extends StandardTextInputProps {
  mask: InputMask | InputMaskProvider;
  pipe?: InputMaskPipe;
  guide?: boolean;
  keepCharPositions?: boolean;
  placeholderChar?: string;
  showMask?: boolean;
}

export const MaskedStandardTextInput: React.FC<MaskedStandardTextInputProps> = ({
  mask,
  pipe,
  onChange,
  onValueChange,
  value,
  guide,
  keepCharPositions,
  placeholderChar,
  showMask,
  ...standardTextInputProps
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
    <StandardTextInput
      {...standardTextInputProps}
      onChange={maskedOnChange}
      value={value}
      inputRef={inputRef}
    />
  );
};
