import * as React from "react";
import { RefObject, useRef } from "react";
import { Box, BoxProps } from "./Box";
import {
  ElementDimensions,
  useElementDimensions,
} from "../../../hooks/UseElementDimensions";

interface Props extends BoxProps {
  onResize?: (dimensions: ElementDimensions) => void;
}

export const ResizeAwareBox: React.FC<Props> = ({
  innerRef,
  onResize,
  ...boxProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentRef = (innerRef as RefObject<HTMLDivElement>) || ref;
  useElementDimensions(currentRef, onResize);

  return <Box {...boxProps} innerRef={currentRef} />;
};
