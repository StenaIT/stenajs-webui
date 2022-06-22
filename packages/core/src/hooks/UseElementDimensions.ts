import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export interface ElementDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

export const getDimensionObject = (node: HTMLElement): ElementDimensions => {
  const { x, y, width, height, bottom, top, left, right } =
    node.getBoundingClientRect();

  return {
    width,
    height,
    top,
    left,
    x,
    y,
    right,
    bottom,
  };
};

const isEqualDimensions = (
  a: ElementDimensions,
  b: ElementDimensions
): boolean =>
  a.x === b.x &&
  a.y === b.y &&
  a.width === b.width &&
  a.height === b.height &&
  a.bottom === b.bottom &&
  a.top === b.top &&
  a.left === b.left &&
  a.right === b.right;

export const useElementDimensions = (
  ref: RefObject<HTMLElement>,
  onResizeElement?: (dimensions: ElementDimensions) => void
) => {
  const [dimensions, setDimensions] = useState<ElementDimensions | undefined>();

  const updateDimensions = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (ref.current) {
        const newDimensions = getDimensionObject(ref.current);
        if (!dimensions || !isEqualDimensions(dimensions, newDimensions)) {
          if (onResizeElement) {
            onResizeElement(newDimensions);
          }
        }
        setDimensions(newDimensions);
      }
    });
  }, [ref, dimensions, setDimensions, onResizeElement]);

  useLayoutEffect(() => {
    updateDimensions();
  }, [updateDimensions]);

  return {
    dimensions,
  };
};
