import * as React from "react";
import * as Infinite from "react-infinite";

interface Props {
  length: number | undefined;
  threshold?: number;
  elementHeight: number;
  disabled?: boolean;
}

export const InfiniteList: React.FC<Props> = ({
  length = 0,
  threshold = 100,
  children,
  disabled,
  elementHeight,
}) => {
  if (length < threshold || disabled) {
    return <>{children}</>;
  }
  return (
    <Infinite useWindowAsScrollContainer elementHeight={elementHeight}>
      {children}
    </Infinite>
  );
};
