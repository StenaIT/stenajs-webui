import { ClassNames, keyframes } from "@emotion/core";
import * as React from "react";
import { ReactComponent as SpinnerSvg } from "./spinner-small.svg";

export interface InputSpinnerProps {
  color?: string;
  size?: string;
}

const loadingCircle = keyframes`
  100% {
    transform:rotate(360deg)
  }
`;

export const InputSpinner: React.FC<InputSpinnerProps> = ({ color, size }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <SpinnerSvg
          className={css`
            width: ${size};
            height: ${size};
            fill: ${color};
            animation: ${loadingCircle} 1s infinite linear;
          `}
        />
      )}
    </ClassNames>
  );
};
