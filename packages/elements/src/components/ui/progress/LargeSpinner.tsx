import { ClassNames, keyframes } from "@emotion/core";
import * as React from "react";
import { ReactComponent as Spinner } from "./spinner-large.svg";

interface LargeSpinnerProps {
  size: string;
}

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const colors = keyframes`
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

export const LargeSpinner: React.FC<LargeSpinnerProps> = ({ size }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Spinner
          className={css`
            width: ${size};
            height: ${size};
            animation: ${rotator} 1.4s linear infinite;

            .spinner-large_svg__path {
              stroke-dasharray: 187;
              stroke-dashoffset: 0;
              stroke-width: 6;
              stroke-linecap: round;
              transform-origin: center;
              animation: ${dash} 1.4s ease-in-out infinite,
                ${colors} 5.6s ease-in-out infinite;
            }
          `}
        />
      )}
    </ClassNames>
  );
};
