export type StickyPropsPerColumn<TColumn extends string> = Record<
  TColumn,
  StickyCellProps
>;

type StickyCellType = "column" | "first-group" | "last-group";

export interface StickyCellProps {
  left: string | undefined;
  right: string | undefined;
  sticky: boolean;
  type: StickyCellType | undefined;
  isFirstColumnInLastGroup: boolean;
  isLastColumnInFirstGroup: boolean;
}
