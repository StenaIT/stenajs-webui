import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  Box,
  Clickable,
  Omit,
  Row,
  Space,
  useThemeFields
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useState
} from "react";
import { FullOnChangeProps } from "../types";
import { SimpleTextInput, SimpleTextInputProps } from "./SimpleTextInput";
import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme
} from "./StandardTextInputTheme";

// TODO Move to theme?

const StyledSimpleTextInput = styled(SimpleTextInput)`
  border: 0;
  :focus {
    outline: 0;
  }
`;

export interface StandardTextInputProps<TValue = string>
  extends Omit<SimpleTextInputProps<TValue>, "theme">,
    FullOnChangeProps<TValue, ChangeEvent<HTMLInputElement>> {
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
  iconLeft?: IconDefinition;
  /** Icon on the right side. */
  iconRight?: IconDefinition;
  /** On click left. */
  onClickLeft?: () => void;
  /** On click right. */
  onClickRight?: () => void;
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
  icon?: IconDefinition;
  iconSize?: number;
  iconColor?: string;
  theme: StandardTextInputTheme;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
  disableContentPadding?: boolean;
  disableContentPaddingLeft?: boolean;
  disableContentPaddingRight?: boolean;
  onClick?: () => void;
}

const TextInputIcon: React.FC<TextInputIconProps> = ({
  icon,
  content,
  iconColor,
  iconSize,
  theme,
  spaceOnLeft,
  spaceOnRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
  onClick
}) => {
  if (!content && !icon) {
    return null;
  }

  if (content) {
    return (
      <>
        {spaceOnLeft &&
          !(disableContentPadding || disableContentPaddingLeft) && <Space />}
        {onClick ? (
          <Clickable onClick={onClick} disableFocusHighlight>
            {content}
          </Clickable>
        ) : (
          <>{content}</>
        )}

        {spaceOnRight &&
          !(disableContentPadding || disableContentPaddingRight) && <Space />}
      </>
    );
  }

  const iconNode = icon && (
    <Icon icon={icon} color={iconColor} size={iconSize || theme.iconSize} />
  );

  return (
    <>
      {spaceOnLeft && <Space />}
      {iconNode && (
        <>
          {onClick ? (
            <Clickable onClick={onClick} disableFocusHighlight>
              {iconNode}
            </Clickable>
          ) : (
            <>{iconNode}</>
          )}
        </>
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
  invalid,
  onBlur,
  onFocus,
  onClickRight,
  onClickLeft,
  onChange,
  onValueChange,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  const { colors } = useThemeFields(
    {
      colors: {
        disagledBackgroundColor: theme.backgroundColorDisabled,
        invalidBackgroundColor: theme.backgroundColorInvalid,
        backgroundColor: backgroundColor || theme.backgroundColor,
        borderColorFocused: theme.borderColorFocused,
        borderColor: theme.borderColor
      }
    },
    [theme, backgroundColor]
  );

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = ev => {
    if (onValueChange) {
      onValueChange(ev.target.value || "");
    }
    if (onChange) {
      onChange(ev);
    }
  };

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = ev => {
    if (onBlur) {
      onBlur(ev);
    }
    setFocused(false);
  };

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = ev => {
    if (onFocus) {
      onFocus(ev);
    }
    setFocused(true);
  };

  const bgColor = disabled
    ? colors.disagledBackgroundColor
    : invalid
    ? colors.invalidBackgroundColor
    : colors.backgroundColor;

  const activeBorderColor =
    forceFocusHighlight || focused
      ? colors.borderColorFocused
      : colors.borderColor;

  return (
    <Box
      background={bgColor}
      borderRadius={theme.borderRadius}
      borderColor={activeBorderColor}
      borderStyle={theme.borderStyle}
      borderWidth={theme.borderWidth}
      width={inputProps.width || "100%"}
      overflow={"hidden"}
    >
      <Row alignItems={"center"} width={inputProps.width || "100%"}>
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
          onClick={onClickLeft}
        />
        <div style={{ width: "100%" }}>
          <StyledSimpleTextInput
            {...inputProps}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            backgroundColor={bgColor}
            disabled={disabled}
            fontSize={theme.fontSize}
            height={theme.height}
            style={{
              paddingLeft: theme.paddingLeft,
              paddingRight: theme.paddingRight,
              boxSizing: "border-box",
              ...inputProps.style
            }}
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
          onClick={onClickRight}
        />
      </Row>
    </Box>
  );
};
