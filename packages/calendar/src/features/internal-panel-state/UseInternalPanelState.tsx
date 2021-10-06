import { CalendarPanelType } from "../calendar-with-month-year-pickers/CalendarPanelType";
import { useCallback, useState } from "react";

export type OnChangePanel = (panel: CalendarPanelType) => void;

export interface UseInternalPanelStateArgs {
  onChangePanel?: OnChangePanel;
}

export const useInternalPanelState = (
  onChangePanel: OnChangePanel | undefined
) => {
  const [currentPanel, _setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  const setCurrentPanel = useCallback(
    (currentPanel: CalendarPanelType) => {
      _setCurrentPanel(currentPanel);
      onChangePanel?.(currentPanel);
    },
    [onChangePanel]
  );

  return {
    currentPanel,
    setCurrentPanel,
  };
};
