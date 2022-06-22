import { useBoolean, useDebounce } from "@stenajs-webui/core";

export const usePopoverVisibility = (openInitially: boolean = false) => {
  const [internalPopoverIsOpen, openPopover, closePopover] =
    useBoolean(openInitially);

  const debouncedPopoverIsOpen = useDebounce(internalPopoverIsOpen, 350);

  const isPopoverOpen = debouncedPopoverIsOpen || internalPopoverIsOpen;

  return {
    isPopoverOpen,
    openPopover,
    closePopover,
  };
};
