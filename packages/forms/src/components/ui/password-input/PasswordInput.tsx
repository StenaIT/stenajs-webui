import * as React from "react";
import { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TextInput, TextInputProps } from "../text-input/TextInput";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

export interface PasswordInputProps extends TextInputProps {
  visibleIcon?: IconDefinition;
  hiddenIcon?: IconDefinition;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  hiddenIcon = faEye,
  visibleIcon = faEyeSlash,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <TextInput
      iconRight={isPassword ? hiddenIcon : visibleIcon}
      onClickRight={() => setIsPassword((x) => !x)}
      type={isPassword ? "password" : "text"}
      {...props}
    />
  );
};
