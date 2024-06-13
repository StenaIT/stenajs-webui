import * as React from "react";
import { forwardRef, RefObject, useRef } from "react";
import { Box, BoxProps } from "./Box";
import {
  ElementDimensions,
  useElementDimensions,
} from "../../../hooks/UseElementDimensions";

export interface ResizeAwareBoxProps extends Omit<BoxProps, "onResize"> {
  onResize?: (dimensions: ElementDimensions) => void;
}

export const ResizeAwareBox = forwardRef<HTMLDivElement, ResizeAwareBoxProps>(
  function ResizeAwareBox({ onResize, ...boxProps }, ref) {
    const localRef = useRef<HTMLDivElement>(null);
    const currentRef = (ref as RefObject<HTMLDivElement>) ?? localRef;
    useElementDimensions(currentRef, onResize);

    return <Box {...boxProps} ref={ref} />;
  }
);
