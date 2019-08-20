import { ClassNames, keyframes } from "@emotion/core";
import * as React from "react";
import { ReactComponent as SpinnerSvg } from "./spinner-large.svg";

export type SpinnerSize = "large" | "normal" | "small";

export interface SpinnerProps {
  size?: SpinnerSize | string;
  color?: string;
  inverted?: boolean;
}

const sizes = {
  large: "78px",
  normal: "54px",
  small: "20px"
};

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

const colorsInverted = keyframes`
  0% {
    stroke: #eee;
  }
  50% {
    stroke: #fff;
  }
  100% {
    stroke: #eee;
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

export const Spinner: React.FC<SpinnerProps> = ({
  size = "normal",
  inverted,
  color
}) => {
  const sizeToUse = (sizes[size] as string | undefined) || size;
  return (
    <ClassNames>
      {({ css }) => {
        const activeColorKeyframes = !inverted ? colors : colorsInverted;

        return (
          <SpinnerSvg
            className={css`
              width: ${sizeToUse};
              height: ${sizeToUse};
              animation: ${rotator} 1.4s linear infinite;

              .spinner-large_svg__path {
                stroke-dasharray: 187;
                stroke-dashoffset: 0;
                stroke-width: 6;
                stroke-linecap: round;
                transform-origin: center;
                ${color
                  ? `stroke: ${color};
                animation: ${dash} 1.4s ease-in-out infinite;
                `
                  : `animation: ${dash} 1.4s ease-in-out infinite,
                ${activeColorKeyframes} 5.6s ease-in-out infinite;
                `}
              }
            `}
          />
        );
      }}
    </ClassNames>
  );
};
