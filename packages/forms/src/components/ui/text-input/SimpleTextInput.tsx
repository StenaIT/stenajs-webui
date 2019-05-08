import styled, { CreateStyled } from "@emotion/styled";
import { useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import {
  defaultSimpleTextInputTheme,
  SimpleTextInputTheme
} from "./SimpleTextInputTheme";

const styledWithTheme = styled as CreateStyled<SimpleTextInputTheme>;

// tslint:disable:no-any

type MoveDirection = "right" | "left" | "down" | "up";

export interface SimpleTextInputProps {
  /** The current value shown in the text input. */
  value?: string;
  /** CSS class name applied to the input element. */
  className?: string;
  /** onChange callback, called when user triggers a value change in the field. */
  onChange?: (value: string) => void;
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
  /** If true, cursor will move to the end of the entered text on mount. */
  moveCursorToEndOnMount?: boolean;
  /** Input ref to use. If omitted, an internal ref will be used. */
  inputRef?: MutableRefObject<HTMLInputElement | null>;

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
  placeholder?: string;
  placeholderColor?: string;
  style?: CSSProperties;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  theme?: SimpleTextInputTheme;
}

export interface SimpleTextInputState {
  wasCancelled: boolean;
}

interface StyledInputProps {
  placeholderColor: string;
  backgroundColor: string;
  backgroundColorDisabled: string;
  textColor: string;
  textColorDisabled: string;
  fontSize: string;
  fontFamily: string;
  height?: string;
  width?: string;
  outerStyle?: CSSProperties;
}

const StyledInput = styledWithTheme("input")<StyledInputProps>(
  ({
    backgroundColor,
    backgroundColorDisabled,
    placeholderColor,
    textColor,
    textColorDisabled,
    fontSize,
    fontFamily,
    height,
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
    backgroundColor: backgroundColor,
    color: textColor,
    "&:disabled": {
      backgroundColor: `${backgroundColorDisabled}`,
      color: `${textColorDisabled}`
    },
    height: height,
    mozAppearance: "textfield",
    width: width || "100%",
    fontSize: fontSize,
    fontFamily: fontFamily,
    ...outerStyle
  })
);

export const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  moveCursorToEndOnMount,
  onChange,
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
  style,
  className,
  theme = defaultSimpleTextInputTheme,
  onFocus,
  placeholderColor,
  focusOnMount,
  selectAllOnMount,
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
  }, []);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ev => {
      if (onChange) {
        onChange(ev.target.value || "");
      }
    },
    [onChange]
  );

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
        onEsc(); // TODO Do this after set state is done.
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
            refToUse.current!.value.length ===
              refToUse.current!.selectionStart &&
            refToUse.current!.selectionStart ===
              refToUse.current!.selectionStart
          ) {
            blurMoveAndCancel("right", ev);
          }
        } else if (key === "ArrowLeft") {
          if (
            refToUse.current!.selectionStart === 0 &&
            refToUse.current!.selectionStart ===
              refToUse.current!.selectionStart
          ) {
            blurMoveAndCancel("left", ev);
          }
        }
      } else if (onKeyDown) {
        onKeyDown(ev);
      }
    },
    [refToUse, onKeyDown, blurMoveAndCancel]
  );

  const onBlurHandler = useCallback(
    (ev: ChangeEvent<any>) => {
      if (onDone && !wasCancelled) {
        onDone(ev.target.value || "");
      }
      if (onBlur) {
        onBlur();
      }
    },
    [onBlur, onDone, wasCancelled]
  );

  const { colors, fontSizes, fonts } = useThemeFields(
    {
      colors: {
        backgroundColor: backgroundColor || theme.backgroundColor,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        placeholderColor: placeholderColor || theme.placeholderColor,
        textColor: textColor || theme.textColor,
        textColorDisabled: theme.textColorDisabled
      },
      fonts: {
        fontFamily: theme.fontFamily
      },
      fontSizes: {
        fontSize: fontSize || theme.fontSize
      }
    },
    [theme]
  );
  return (
    <StyledInput
      placeholderColor={colors.placeholderColor}
      backgroundColor={colors.backgroundColor}
      backgroundColorDisabled={colors.backgroundColorDisabled}
      textColor={colors.textColor}
      textColorDisabled={colors.textColorDisabled}
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
      onFocus={onFocus}
      autoFocus={focusOnMount || selectAllOnMount}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
    />
  );
};
