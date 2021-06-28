export type StickyPropsPerColumn<TColumn extends string> = Record<
  TColumn,
  StickyCellProps
>;

export interface StickyCellProps {
  left: string | undefined;
  right: string | undefined;
  sticky: boolean;
}
