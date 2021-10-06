import { useTippyInstance } from "@stenajs-webui/tooltip";
import { useCallback } from "react";

export const usePopoverCalendar = () => {
  const [tippyRef, tippyInstanceRef] = useTippyInstance();

  const onChangePanel = useCallback(() => {
    tippyInstanceRef.current?.popperInstance?.update();
  }, [tippyInstanceRef]);

  return {
    onChangePanel,
    tippyRef,
  };
};
