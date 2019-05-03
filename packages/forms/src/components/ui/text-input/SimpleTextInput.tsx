import styled, { CreateStyled } from "@emotion/styled";
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
import { defaultSimpleCheckboxTheme } from "../checkbox/SimpleCheckboxTheme";
import { SimpleTextInputTheme } from "./SimpleTextInputTheme";

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

const StyledInput = styledWithTheme("input")<
  Pick<
    SimpleTextInputProps,
    | "backgroundColor"
    | "fontSize"
    | "height"
    | "placeholderColor"
    | "textColor"
    | "width"
  > & { outerStyle?: CSSProperties }
>(
  ({
    backgroundColor,
    fontSize,
    height,
    outerStyle,
    placeholderColor,
    textColor,
    theme,
    width
  }) => ({
    "&::placeholder": {
      color: placeholderColor || theme.placeholderColor
    },
    "&::-webkit-outer-spin-button": {
      webkitAppearance: "none",
      margin: 0
    },
    "&::-webkit-inner-spin-button": {
      webkitAppearance: "none",
      margin: 0
    },
    backgroundColor: backgroundColor || theme.backgroundColor,
    color: textColor || theme.textColor,
    "&:disabled": {
      backgroundColor: `${theme.disabledBackgroundColor}`,
      color: `${theme.disabledTextColor}`
    },
    height: height || theme.height,
    mozAppearance: "textfield",
    width: width || "100%",
    fontSize: fontSize || theme.fontSize,
    fontFamily: theme.fontFamily,
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
  theme = defaultSimpleCheckboxTheme,
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

  return (
    <StyledInput
      theme={theme}
      placeholderColor={placeholderColor}
      backgroundColor={backgroundColor}
      textColor={textColor}
      width={width}
      height={height}
      fontSize={fontSize}
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
