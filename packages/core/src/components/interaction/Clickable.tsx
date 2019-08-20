import styled from "@emotion/styled";
import * as React from "react";
import { CSSProperties, MouseEventHandler } from "react";
import { ButtonProps } from "../../types/ElementProps";

export interface ClickableProps extends ButtonProps {
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
  /** Disables the HTML button element. */
  disabled?: boolean;
}

interface ClickableElementProps {
  disableOpacityOnClick?: boolean;
  opacityOnHover?: boolean;
  disableFocusHighlight?: boolean;
  pointer?: boolean;
}

const ClickableElement = styled.button<ClickableElementProps>`
  display: inline-block;
  user-select: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  ${({ pointer }) => (pointer ? "cursor: pointer;" : "")}

  :hover {
    ${props => (props.opacityOnHover ? "opacity: 0.7;" : "")};
  }
  :active {
    ${({ disableOpacityOnClick }) =>
      !disableOpacityOnClick ? "opacity: 0.5;" : ""}
  }
  :focus {
    outline: 0;
    ${({ disableFocusHighlight }) =>
      disableFocusHighlight
        ? ""
        : "box-shadow: 0 0 3pt 2pt rgba(0, 0, 100, 0.3);"}
  }
`;

export const Clickable: React.FC<ClickableProps> = ({
  disableFocusHighlight,
  onClick,
  onDblClick,
  tooltip,
  disableOpacityOnClick,
  disablePointer,
  opacityOnHover,
  innerRef,
  disabled,
  children,
  ...restProps
}) => {
  const hasClickHandler = !!(onClick || onDblClick);
  return (
    <ClickableElement
      opacityOnHover={opacityOnHover}
      title={tooltip}
      disabled={disabled}
      disableOpacityOnClick={disableOpacityOnClick}
      onClick={onClick}
      onDoubleClick={onDblClick}
      disableFocusHighlight={disableFocusHighlight}
      pointer={hasClickHandler && !disablePointer}
      ref={innerRef}
      {...restProps}
    >
      {children}
    </ClickableElement>
  );
};
