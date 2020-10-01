import { useMemo, useState } from "react";
import { Plugin } from "tippy.js";

export const useLazyPopover = (plugins: Plugin<unknown>[] = []) => {
  const [mounted, setMounted] = useState(false);

  const lazyPlugin = useMemo(
    () => ({
      fn: () => ({
        onShow: () => setMounted(true),
        onHidden: () => setMounted(false),
      }),
    }),
    [setMounted]
  );

  return {
    plugins: [lazyPlugin, ...plugins],
    mounted,
  };
};
