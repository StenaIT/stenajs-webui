import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Clickable, InputProps, Row, useThemeFields } from '@stenajs-webui/core';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import { FullOnChangeProps } from '../types';
import { CheckboxTheme, defaultCheckboxTheme } from './CheckboxTheme';

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps {
  disabled?: boolean;
  theme?: CheckboxTheme;
}

const InvisibleInput = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  cursor: inherit;
  height: 100%;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

const Wrapper = styled("div")<{
  borderRadius: string;
  disabled: boolean | undefined;
  themeFields: ThemeFields;
  value: boolean | undefined;
}>`
  background-color: ${({ disabled, themeFields, value }) =>
    disabled
      ? themeFields.colors.backgroundColorDisabled
      : value
      ? themeFields.colors.backgroundColorChecked
      : themeFields.colors.backgroundColor};
  border: 1px solid;
  border-radius: ${({ borderRadius }) => borderRadius};
  border-color: ${({ disabled, themeFields, value }) =>
    disabled
      ? themeFields.colors.borderColorDisabled
      : value
      ? themeFields.colors.borderColorChecked
      : themeFields.colors.borderColor};
  overflow: hidden;
`;

const StyledCheckboxWrapper = styled.div<{ theme: CheckboxTheme }>`
  height: ${({ theme }) => theme.height};
  position: relative;
  width: ${({ theme }) => theme.width};

  input:focus + div {
    border-color: ${({ theme }) => theme.borderColorFocused};
  }
`;

type ThemeFields = {
  colors: {
    backgroundColor: string;
    backgroundColorChecked: string;
    backgroundColorDisabled: string;
    borderColor: string;
    borderColorChecked: string;
    borderColorDisabled: string;
    iconColorDisabled: string;
    iconColor: string;
  };
};

export const Checkbox: React.FC<CheckboxProps> = ({
         className,
         disabled,
         innerRef,
         inputRef,
         onChange,
         onValueChange,
         theme = defaultCheckboxTheme,
         value
       }) => {
         const themeFields = useThemeFields<ThemeFields>(
           {
             colors: {
               backgroundColor: theme.backgroundColor,
               backgroundColorChecked: theme.backgroundColorChecked,
               backgroundColorDisabled: theme.backgroundColorDisabled,
               borderColor: theme.borderColor,
               borderColorChecked: theme.borderColorChecked,
               borderColorDisabled: theme.borderColorDisabled,
               iconColorDisabled: theme.iconColorDisabled,
               iconColor: theme.iconColor
             }
           },
           [theme]
         );

         const onClick = useCallback(
           ev => {
             if (onChange) {
               onChange(ev);
             }
             if (onValueChange) {
               onValueChange(!value);
             }
           },
           [onChange, onValueChange, value]
         );

         const handleInputChange = useCallback(
           (ev: ChangeEvent<HTMLInputElement>) => {
             if (!disabled) {
               if (onChange) {
                 onChange(ev);
               }
               if (onValueChange) {
                 onValueChange(ev.target.checked);
               }
             }
           },
           [disabled, onChange]
         );

         return (
           <StyledCheckboxWrapper
             className={className}
             ref={innerRef}
             theme={theme}
           >
             <Clickable onClick={disabled ? undefined : onClick}>
               <InvisibleInput
                 disabled={disabled}
                 checked={value}
                 ref={inputRef}
                 onChange={handleInputChange}
                 type={"checkbox"}
               />
               <Wrapper
                 borderRadius={theme.borderRadius}
                 disabled={disabled}
                 themeFields={themeFields}
                 value={value}
               >
                 <Row
                   justifyContent={"center"}
                   alignItems={"center"}
                   width={theme.width}
                   height={theme.height}
                 >
                   {value && (
                     <FontAwesomeIcon
                       icon={theme.checkIcon}
                       color={
                         disabled
                           ? themeFields.colors.iconColorDisabled
                           : themeFields.colors.iconColor
                       }
                       style={{ fontSize: theme.iconSize }}
                     />
                   )}
                 </Row>
               </Wrapper>
             </Clickable>
           </StyledCheckboxWrapper>
         );
       };
