import styled from "@emotion/styled";
import { ColorProperty } from "csstype";
import * as React from "react";
import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";
import { ThemeColorField } from "../../../theme/theme-types/ThemeColors";

export interface SeparatorLineProps {
  color?: ThemeColorField | ColorProperty;
  vertical?: boolean;
  size?: string;
  width?: string;
}

const SeparatorLineComponent = styled.hr<{
  color: string;
  vertical?: boolean;
  size?: string;
  width?: string;
}>`
  display: flex;
  background-color: ${props => props.color};
  border: 0;
  height: ${props =>
    props.vertical ? props.size || "100%" : props.width || "1px"};
  width: ${props =>
    props.vertical ? props.width || "1px" : props.size || "100%"};
`;

export const SeparatorLine: React.FC<SeparatorLineProps> = ({
  color,
  ...props
}) => {
  const themeProps = useThemeSelector(
    theme => ({
      color: color ? theme.colors[color] || color : theme.colors.separator
    }),
    [color]
  );
  return <SeparatorLineComponent {...props} {...themeProps} />;
};
