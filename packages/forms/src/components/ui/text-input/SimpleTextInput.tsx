import styled, { CreateStyled } from "@emotion/styled";
import { InputProps, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import {
  ChangeEvent,
  CSSProperties,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { FullOnChangeProps } from "../types";
import {
  defaultSimpleTextInputTheme,
  SimpleTextInputTheme
} from "./SimpleTextInputTheme";

const styledWithTheme = styled as CreateStyled<SimpleTextInputTheme>;

// tslint:disable:no-any

export type MoveDirection = "right" | "left" | "down" | "up";

export interface SimpleTextInputProps<TValue = string>
  extends FullOnChangeProps<TValue, ChangeEvent<HTMLInputElement>>,
    InputProps {
  /** CSS class name applied to the input element. */
  className?: string;
  /** onDone callback, triggered by blur, if the blur was not triggered by esc key. */
  onDone?: (value: string) => void;
  /** onEsc callback, called user presses the escape key. */
  onEsc?: () => void;
  /** onEnter callback, called user presses the enter key. This triggers a blur. */
  onEnter?: () => void;
  /** Width of the input element. */
  width?: string;
  /** Height of the input element. */
  height?: string;
  /** If true, field will focus automatically when mounted in DOM. */
  focusOnMount?: boolean;
  /** If true, all text in the input field will be selected on mount. */
  selectAllOnMount?: boolean;
  /** If true, all text in the input field will be selected when field is focused. */
  selectAllOnFocus?: boolean;
  /** If true, cursor will move to the end of the entered text on mount. */
  moveCursorToEndOnMount?: boolean;

  /** Type of input */
  inputType?: string;
  fontSize?: string;
  maxLength?: number;
  size?: number;
  min?: number;
  max?: number;
  step?: number;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
  placeholderColor?: string;
  style?: CSSProperties;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  theme?: SimpleTextInputTheme;
}

interface StyledInputProps {
  placeholderColor: string;
  backgroundColor: string;
  backgroundColorDisabled: string;
  backgroundColorInvalid: string;
  textColor: string;
  textColorDisabled: string;
  textColorInvalid: string;
  fontSize: string;
  fontFamily: string;
  height?: string;
  invalid: boolean;
  width?: string;
  outerStyle?: CSSProperties;
}

const StyledInput = styledWithTheme("input")<StyledInputProps>(
  ({
    backgroundColor,
    backgroundColorDisabled,
    backgroundColorInvalid,
    placeholderColor,
    textColor,
    textColorDisabled,
    textColorInvalid,
    fontSize,
    fontFamily,
    height,
    invalid,
    outerStyle,
    width
  }) => ({
    "&::placeholder": {
      color: placeholderColor
    },
    "&::-webkit-outer-spin-button": {
      webkitAppearance: "none",
      margin: 0
    },
    "&::-webkit-inner-spin-button": {
      webkitAppearance: "none",
      margin: 0
    },
    backgroundColor: invalid ? backgroundColorInvalid : backgroundColor,
    color: invalid ? textColorInvalid : textColor,
    "&:disabled": {
      backgroundColor: `${backgroundColorDisabled}`,
      color: `${textColorDisabled}`
    },
    height: height,
    "-moz-appearance": "textfield",
    width: width || "100%",
    fontSize: fontSize,
    fontFamily: fontFamily,
    ...outerStyle
  })
);

export const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  moveCursorToEndOnMount,
  onChange,
  onValueChange,
  onEsc,
  onEnter,
  onKeyDown,
  onMove,
  onDone,
  onBlur,
  value = "",
  width,
  height,
  fontSize,
  maxLength,
  size,
  backgroundColor,
  textColor,
  placeholder,
  disabled = false,
  invalid = false,
  style,
  className,
  theme = defaultSimpleTextInputTheme,
  onFocus,
  placeholderColor,
  focusOnMount,
  selectAllOnMount,
  selectAllOnFocus,
  inputType = "text",
  min,
  max,
  step,
  inputRef
}) => {
  const [wasCancelled, setWasCancelled] = useState(false);
  const internalRef = useRef<HTMLInputElement | null>(null);
  const refToUse = inputRef || internalRef;

  useEffect(() => {
    if (refToUse.current) {
      if (selectAllOnMount) {
        refToUse.current!.setSelectionRange(0, refToUse.current!.value.length);
      } else if (moveCursorToEndOnMount) {
        refToUse.current!.setSelectionRange(
          refToUse.current!.value.length,
          refToUse.current!.value.length
        );
      }
    }
  }, [moveCursorToEndOnMount, refToUse, selectAllOnMount]);

  const blurMoveAndCancel = useCallback(
    (direction: MoveDirection, e: KeyboardEvent<HTMLInputElement>) => {
      refToUse.current!.blur();
      if (onMove) {
        onMove(direction);
      }
      e.preventDefault();
      e.stopPropagation();
    },
    [onMove, refToUse]
  );

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ev => {
      const { key } = ev;
      if (key === "Enter") {
        refToUse.current!.blur();
        if (onEnter) {
          onEnter();
        }
      } else if (onEsc && key === "Escape") {
        setWasCancelled(true);
        setTimeout(() => {
          onEsc(); // Do this after set state is done. Is there a better way?
        }, 100);

        ev.preventDefault();
        ev.stopPropagation();
      } else if (onMove) {
        if (ev.shiftKey && key === "Tab") {
          blurMoveAndCancel("left", ev);
        } else if (key === "Tab") {
          blurMoveAndCancel("right", ev);
        } else if (key === "ArrowUp") {
          blurMoveAndCancel("up", ev);
        } else if (key === "ArrowDown") {
          blurMoveAndCancel("down", ev);
        } else if (key === "ArrowRight") {
          if (
            refToUse.current!.value.length === refToUse.current!.selectionStart
          ) {
            blurMoveAndCancel("right", ev);
          }
        } else if (key === "ArrowLeft") {
          if (refToUse.current!.selectionStart === 0) {
            blurMoveAndCancel("left", ev);
          }
        }
      } else if (onKeyDown) {
        onKeyDown(ev);
      }
    },
    [onEsc, onMove, onKeyDown, refToUse, onEnter, blurMoveAndCancel]
  );

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = ev => {
    if (onDone && !wasCancelled) {
      onDone(ev.target.value || "");
    }
    if (onBlur) {
      onBlur(ev);
    }
  };

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = ev => {
    if (refToUse.current) {
      if (selectAllOnFocus) {
        refToUse.current!.setSelectionRange(0, refToUse.current!.value.length);
      }
    }
    if (onFocus) {
      onFocus(ev);
    }
  };

  const { colors, fontSizes, fonts } = useThemeFields(
    {
      colors: {
        backgroundColor: backgroundColor || theme.backgroundColor,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        backgroundColorInvalid: theme.backgroundColorInvalid,
        placeholderColor: placeholderColor || theme.placeholderColor,
        textColor: textColor || theme.textColor,
        textColorDisabled: theme.textColorDisabled,
        textColorInvalid: theme.textColorInvalid
      },
      fonts: {
        fontFamily: theme.fontFamily
      },
      fontSizes: {
        fontSize: fontSize || theme.fontSize
      }
    },
    [theme, backgroundColor, textColor]
  );

  const onChangeHandler = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(ev.target.value);
      }
    },
    [onChange, onValueChange]
  );

  return (
    <StyledInput
      placeholderColor={colors.placeholderColor}
      backgroundColor={colors.backgroundColor}
      backgroundColorDisabled={colors.backgroundColorDisabled}
      backgroundColorInvalid={colors.backgroundColorInvalid}
      textColor={colors.textColor}
      textColorDisabled={colors.textColorDisabled}
      textColorInvalid={colors.textColorInvalid}
      width={width}
      height={height}
      fontSize={fontSizes.fontSize}
      fontFamily={fonts.fontFamily}
      outerStyle={style}
      className={className}
      type={inputType}
      ref={refToUse}
      onKeyDown={onKeyDownHandler}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      autoFocus={focusOnMount || selectAllOnMount}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      invalid={invalid}
      min={min}
      max={max}
      step={step}
    />
  );
};
