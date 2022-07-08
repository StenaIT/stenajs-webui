import * as React from "react";
import { ReactNode, useLayoutEffect, useRef } from "react";

export const ValueTableExpandableContent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const divElem = ref.current;

    if (divElem) {
      const resizeObserver = new ResizeObserver((entries) => {
        const onlyEntry = entries[0];

        if (onlyEntry) {
          console.log(onlyEntry.borderBoxSize);
        }

        console.log("Size changed");
      });

      resizeObserver.observe(divElem);

      return () => {
        resizeObserver.unobserve(divElem);
      };
    }

    return () => {};
  });

  return (
    <div ref={ref} style={{ display: "inline-block", overflow: "hidden" }}>
      {children}
    </div>
  );
};
