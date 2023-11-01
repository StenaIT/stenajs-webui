import * as React from "react";
import { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TextInput, TextInputProps } from "../text-input/TextInput";
import { stenaEyeHide, stenaEyeShow } from "@stenajs-webui/elements";
import { TextInputButton } from "../text-input/TextInputButton";

export interface PasswordInputProps extends TextInputProps {
  visibleIcon?: IconDefinition;
  hiddenIcon?: IconDefinition;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  hiddenIcon = stenaEyeShow,
  visibleIcon = stenaEyeHide,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <TextInput
      buttonRight={
        <TextInputButton
          icon={isPassword ? hiddenIcon : visibleIcon}
          onClick={() => setIsPassword((x) => !x)}
        />
      }
      type={isPassword ? "password" : "text"}
      {...props}
    />
  );
};
