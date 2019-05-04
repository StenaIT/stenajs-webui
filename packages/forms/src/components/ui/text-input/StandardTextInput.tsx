import styled from "@emotion/styled";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useCallback, useState } from "react";
import { Box, Row, Space, Omit } from "@stenajs-webui/core";
import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme
} from "./StandardTextInputTheme";
import { SimpleTextInput, SimpleTextInputProps } from "./SimpleTextInput";

// TODO Move to theme.

const StyledSimpleTextInput = styled(SimpleTextInput)`
  border: 0;
  :focus {
    outline: 0;
  }
`;

export interface StandardTextInputProps
  extends Omit<SimpleTextInputProps, "theme"> {
  /** React node to put to the left. Left icon is ignored if this is set. */
  contentLeft?: React.ReactNode;
  /** React node to put to the right. Right icon is ignored if this is set. */
  contentRight?: React.ReactNode;
  /** If true, there will be no padding between contentLeft/contentRight and the border. */
  disableContentPadding?: boolean;
  /** If true, there will be no padding between contentLeft and the border. */
  disableContentPaddingLeft?: boolean;
  /** If true, there will be no padding between contentRight and the border. */
  disableContentPaddingRight?: boolean;
  /** Icon on the left side. */
  iconLeft?: IconProp;
  /** Icon on the right side. */
  iconRight?: IconProp;
  /** Color of the icon on the left side. */
  iconColorLeft?: string;
  /** Color of the icon on the right side. */
  iconColorRight?: string;
  /** Size of the icon on the left side. */
  iconSizeLeft?: number;
  /** Size of the icon on the right side. */
  iconSizeRight?: number;
  /** Force focus highlight. */
  forceFocusHighlight?: boolean;
  /** The theme to use. */
  theme?: StandardTextInputTheme;
}

interface TextInputIconProps {
  content?: React.ReactNode;
  icon?: IconProp;
  iconSize?: number;
  iconColor?: string;
  theme: StandardTextInputTheme;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
  disableContentPadding?: boolean;
  disableContentPaddingLeft?: boolean;
  disableContentPaddingRight?: boolean;
}

const TextInputIcon = ({
  icon,
  content,
  iconColor,
  iconSize,
  theme,
  spaceOnLeft,
  spaceOnRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight
}: TextInputIconProps) => {
  if (!content && !icon) {
    return null;
  }

  if (content) {
    return (
      <>
        {spaceOnLeft &&
          !(disableContentPadding || disableContentPaddingLeft) && <Space />}
        {content}
        {spaceOnRight &&
          !(disableContentPadding || disableContentPaddingRight) && <Space />}
      </>
    );
  }

  return (
    <>
      {spaceOnLeft && <Space />}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          color={iconColor}
          style={{ fontSize: iconSize || theme.iconSize }}
        />
      )}
      {spaceOnRight && <Space />}
    </>
  );
};

export const StandardTextInput: React.FC<StandardTextInputProps> = ({
  textColor,
  contentLeft,
  contentRight,
  iconLeft,
  iconRight,
  iconColorLeft,
  iconColorRight,
  iconSizeLeft,
  iconSizeRight,
  backgroundColor,
  forceFocusHighlight,
  disableContentPadding = false,
  disableContentPaddingLeft = false,
  disableContentPaddingRight = false,
  theme = defaultStandardTextInputTheme,
  disabled,
  onBlur,
  onFocus,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  const onBlurHandler = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
    setFocused(false);
    return {
      focused: false
    };
  }, [onBlur, setFocused]);

  const onFocusHandler = useCallback(() => {
    if (onFocus) {
      onFocus();
    }
    setFocused(true);
  }, [onFocus, setFocused]);

  return (
    <Box
      background={
        disabled
          ? theme.disabledBackgroundColor
          : backgroundColor || theme.backgroundColor
      }
      borderRadius={theme.borderRadius}
      borderColor={
        forceFocusHighlight || focused
          ? theme.borderColorFocused
          : theme.borderColor
      }
      borderStyle={theme.borderStyle}
      width={theme.borderWidth}
      style={{ width: inputProps.width || "100%" }}
    >
      <Row alignItems={"center"} style={{ width: inputProps.width || "100%" }}>
        <TextInputIcon
          content={contentLeft}
          disableContentPadding={disableContentPadding}
          disableContentPaddingLeft={disableContentPaddingLeft}
          disableContentPaddingRight={disableContentPaddingRight}
          icon={iconLeft}
          iconColor={iconColorLeft}
          iconSize={iconSizeLeft}
          spaceOnLeft
          theme={theme}
        />
        <div style={{ width: "100%" }}>
          <StyledSimpleTextInput
            {...inputProps}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            backgroundColor={backgroundColor || theme.backgroundColor}
            disabled={disabled}
            fontSize={theme.fontSize}
            height={theme.height}
            style={{
              paddingLeft: theme.paddingLeft,
              paddingRight: theme.paddingRight,
              boxSizing: "border-box",
              ...inputProps.style
            }}
            textColor={textColor || theme.textColor}
            width={"100%"}
          />
        </div>
        <TextInputIcon
          content={contentRight}
          disableContentPadding={disableContentPadding}
          disableContentPaddingLeft={disableContentPaddingLeft}
          disableContentPaddingRight={disableContentPaddingRight}
          icon={iconRight}
          iconColor={iconColorRight}
          iconSize={iconSizeRight}
          spaceOnRight
          theme={theme}
        />
      </Row>
    </Box>
  );
};
