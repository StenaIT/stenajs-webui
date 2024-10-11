import { Property } from "csstype";
import { CSSProperties } from "react";

export const createStickyHeaderProps = (
  stickyHeader: boolean | undefined,
  stickyColumn: boolean | undefined,
  headerRowOffsetTop: string | undefined,
  zIndexFromConfig: number | undefined,
): CSSProperties => ({
  top: stickyHeader
    ? getTopPosition(stickyHeader, headerRowOffsetTop)
    : undefined,
  background: stickyHeader || stickyColumn ? "white" : undefined,
  position: stickyHeader || stickyColumn ? "sticky" : undefined,
  boxShadow: stickyColumn
    ? "var(--swui-sticky-column-shadow-right)"
    : undefined,
  zIndex:
    stickyHeader || stickyColumn
      ? (zIndexFromConfig ??
        ("var(--swui-sticky-header-z-index)" as Property.ZIndex))
      : zIndexFromConfig,
});

const getTopPosition = (
  stickyHeader: boolean | undefined,
  headerRowOffsetTop: string | undefined,
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
