import * as React from "react";
import * as Infinite from "react-infinite";

interface Props {
  length: number | undefined;
  threshold?: number;
  elementHeight: number;
}

export const InfiniteList: React.FC<Props> = ({
  length = 0,
  threshold = 100,
  children,
  elementHeight
}) => {
  if (length < threshold) {
    return <>{children}</>;
  }
  return (
    <Infinite useWindowAsScrollContainer elementHeight={elementHeight}>
      {children}
    </Infinite>
  );
};
