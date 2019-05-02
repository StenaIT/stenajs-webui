import styled from "@emotion/styled";
import * as React from "react";
import { CSSProperties, MouseEventHandler, useCallback, useState } from "react";

export interface ClickableProps {
  /** Callback function called when clicking on click area. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Callback function called when double clicking on click area. */
  onDblClick?: MouseEventHandler<HTMLButtonElement>;
  /** Adds a title to the click area. */
  tooltip?: string;
  /** If set, there is no opacity applies when clicking on the click area. */
  disableOpacityOnClick?: boolean;
  /** Mouse does not turn into pointer when hovering over click area. */
  disablePointer?: boolean;
  /** When set, click area receives opacity when mouse hovers over it. */
  opacityOnHover?: boolean;
  /** Custom style on div with click event. */
  style?: CSSProperties;
  /** Disables shadow when element is focused. */
  disableFocusHighlight?: boolean;
}

interface ClickableElementProps {
  opacityOnHover: boolean | undefined;
  disableFocusHighlight?: boolean;
}

const ClickableElement = styled.button<ClickableElementProps>`
  :hover {
    ${props => (props.opacityOnHover ? "opacity: 0.7;" : "")};
  }
  :focus {
    outline: 0;
    ${({ disableFocusHighlight }) =>
      disableFocusHighlight
        ? ""
        : "box-shadow: 0 0 3pt 2pt rgba(0, 0, 100, 0.3);"}
  }
  border: 0;
  padding: 0;
`;

export const Clickable: React.FC<ClickableProps> = ({
  disableFocusHighlight,
  onClick,
  onDblClick,
  tooltip,
  disableOpacityOnClick,
  disablePointer,
  opacityOnHover,
  style,
  children
}) => {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const onMouseDown = useCallback(() => {
    setMouseIsDown(true);
  }, [setMouseIsDown]);
  const onMouseUp = useCallback(() => {
    setMouseIsDown(false);
  }, [setMouseIsDown]);
  const onMouseOut = useCallback(() => {
    setMouseIsDown(false);
  }, [setMouseIsDown]);

  const hasClickHandler = !!(onClick || onDblClick);
  const opacity = !disableOpacityOnClick && mouseIsDown ? 0.5 : undefined;
  return (
    <ClickableElement
      opacityOnHover={opacityOnHover}
      title={tooltip}
      style={{
        cursor: hasClickHandler && !disablePointer ? "pointer" : undefined,
        display: "inline-block",
        userSelect: "none",
        opacity,
        ...style
      }}
      onClick={onClick}
      onDoubleClick={onDblClick}
      onMouseDown={hasClickHandler ? onMouseDown : undefined}
      onMouseUp={hasClickHandler ? onMouseUp : undefined}
      onMouseOut={hasClickHandler ? onMouseOut : undefined}
      disableFocusHighlight={disableFocusHighlight}
    >
      {children}
    </ClickableElement>
  );
};
