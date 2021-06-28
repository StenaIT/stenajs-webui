import { createContext, useContext } from "react";
import { OffsetPerColumn } from "../util/StickyColumnGroupOffsetCalculator";

export const StickyColumnOffsetContext = createContext<OffsetPerColumn<string>>(
  {}
);

export const useStickyColumnOffsetContext = () =>
  useContext(StickyColumnOffsetContext);
