import { ClassNames, keyframes } from "@emotion/core";
import * as React from "react";
import { ReactComponent as SpinnerSvg } from "./spinner-small.svg";

export interface InputSpinnerProps {
  color?: string;
  size?: string;
  className?: string;
}

const loadingCircle = keyframes`
  100% {
    transform:rotate(360deg)
  }
`;

export const InputSpinner: React.FC<InputSpinnerProps> = ({
  className,
  color,
  size,
}) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <SpinnerSvg
          className={cx(
            className,
            css`
              color: ${color};
              width: ${size};
              height: ${size};
              fill: currentColor;
              animation: ${loadingCircle} 1s infinite linear;
            `
          )}
        />
      )}
    </ClassNames>
  );
};
