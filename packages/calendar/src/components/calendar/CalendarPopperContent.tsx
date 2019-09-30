import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Popper } from "react-popper";

interface CalendarPopperContent {
  background?: string;
  borderColor?: string;
  innerRef: Ref<HTMLDivElement>;
  open: boolean;
  zIndex?: number;
}

export const CalendarPopperContent: React.FC<CalendarPopperContent> = ({
  children,
  background,
  borderColor,
  innerRef,
  open,
  zIndex
}) => {
  return (
    <Popper placement={"bottom-end"}>
      {({ ref, style }) =>
        open && (
          <Box innerRef={ref} style={{ zIndex: zIndex, ...style }}>
            <Box
              innerRef={innerRef}
              background={background}
              borderColor={borderColor}
              borderStyle={"solid"}
              borderWidth={"1px"}
              indent={1}
            >
              {children}
            </Box>
          </Box>
        )
      }
    </Popper>
  );
};
