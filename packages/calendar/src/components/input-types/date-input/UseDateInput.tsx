import { useCallback, useState } from "react";

export const useDateInput = (
  onChange?: (date: Date | undefined) => void,
  onClose?: () => void,
  openOnMount?: boolean
) => {
  const [showingCalendar, setShowingCalendar] = useState(openOnMount || false);

  const showCalendar = useCallback(() => {
    setShowingCalendar(true);
    return true;
  }, [setShowingCalendar]);

  const hideCalendar = useCallback(() => {
    setShowingCalendar(false);
    if (onClose) {
      onClose();
    }
  }, [setShowingCalendar, onClose]);

  const onSelectDate = useCallback(
    (date: Date | undefined) => {
      if (onChange) {
        onChange(date);
      }
      setTimeout(hideCalendar, 150);
    },
    [onChange, hideCalendar]
  );

  return {
    showCalendar,
    hideCalendar,
    showingCalendar,
    onSelectDate,
  };
};
