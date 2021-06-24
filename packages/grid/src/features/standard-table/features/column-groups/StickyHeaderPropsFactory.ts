import { Property } from "csstype";
import { CSSProperties } from "react";

export const createStickyHeaderProps = (
  stickyHeader: boolean | undefined,
  headerRowOffsetTop: string | undefined,
  zIndexFromConfig: number | undefined
): CSSProperties => ({
  top: stickyHeader
    ? getTopPosition(stickyHeader, headerRowOffsetTop)
    : undefined,
  background: stickyHeader ? "white" : undefined,
  position: stickyHeader ? "sticky" : undefined,
  boxShadow: stickyHeader ? "var(--swui-sticky-header-shadow)" : undefined,
  zIndex: stickyHeader
    ? zIndexFromConfig ??
      ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
    : zIndexFromConfig,
});

const getTopPosition = (
  stickyHeader: boolean | undefined,
  headerRowOffsetTop: string | undefined
) => {
  if (stickyHeader && headerRowOffsetTop) {
    return headerRowOffsetTop;
  } else if (headerRowOffsetTop) {
    return headerRowOffsetTop;
  } else if (stickyHeader) {
    return 0;
  }
  return undefined;
};
