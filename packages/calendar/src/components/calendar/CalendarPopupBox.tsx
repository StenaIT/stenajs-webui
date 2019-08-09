import { Absolute, Box, Relative } from '@stenajs-webui/core';
import * as React from 'react';
import { Ref } from 'react';

interface Props {
  background?: string;
  borderColor?: string;
  innerRef: Ref<HTMLDivElement>;
  zIndex?: number;
}

export const CalendarPopupBox: React.FC<Props> = ({
  children,
  background,
  borderColor,
  innerRef,
  zIndex
}) => {
  return (
    <Relative>
      <Absolute zIndex={zIndex} innerRef={innerRef}>
        <Box
          background={background}
          borderColor={borderColor}
          borderStyle={"solid"}
          borderWidth={"1px"}
          indent
        >
          {children}
        </Box>
      </Absolute>
    </Relative>
  );
};
