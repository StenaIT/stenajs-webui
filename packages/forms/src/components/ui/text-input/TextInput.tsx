import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { InputProps } from "@stenajs-webui/core";
import {
  InputSpinner,
  stenaCheck,
  stenaExclamationTriangle,
} from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import { ChangeEvent, CSSProperties, useRef } from "react";
import { MoveDirection } from "../../../hooks/UseKeyboardNavigation";
import { useTextInput } from "../../../hooks/UseTextInput";
import { FullOnChangeProps } from "../types";
import styles from "./TextInput.module.css";
import { TextInputIcon } from "./TextInputIcon";

export type TextInputBorderVariant =
  | "normalBorder"
  | "onlyTop"
  | "onlyBottom"
  | "onlyLeft"
  | "onlyRight";

export type TextInputVariant =
  | "standard"
  | "loading"
  | "warning"
  | "error"
  | "modified"
  | "success";

interface ExtraContent {
  /** React node to put to the left. Left icon is ignored if this is set. */
  contentLeft?: React.ReactNode;
  /** React node to put to the right. Right icon is ignored if this is set. */
  contentRight?: React.ReactNode;
  /** TextInputButton to the left. Left icon and content is ignored if this is set. */
  buttonLeft?: React.ReactNode;
  /** React node to put to the right. Right icon and content is ignored if this is set. */
  buttonRight?: React.ReactNode;
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
}

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps,
    ExtraContent {
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;
  variant?: TextInputVariant;
  hideBorder?: boolean;
  selectAllOnMount?: boolean;
  moveCursorToEndOnMount?: boolean;
  onDone?: (value: string) => void;
  onEnter?: () => void;
  onEsc?: () => void;
  autoFocus?: boolean;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
  borderRadiusVariant?: TextInputBorderVariant;
  alwaysShowPlaceholder?: boolean;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    variant = "standard",
    inputRef,
    disabled,
    className,
    buttonLeft,
    buttonRight,
    contentLeft,
    contentRight,
    disableContentPadding,
    disableContentPaddingLeft,
    disableContentPaddingRight,
    iconLeft,
    iconRight,
    moveCursorToEndOnMount,
    selectAllOnMount,
    autoFocus,
    onValueChange,
    wrapperClassName,
    wrapperStyle,
    onDone,
    onEnter,
    onEsc,
    onMove,
    onChange,
    onKeyDown,
    hideBorder,
    onFocus,
    onBlur,
    borderRadiusVariant = "normalBorder",
    width,
    alwaysShowPlaceholder,
    ...inputProps
  } = props;
  const localRef = useRef<HTMLInputElement>(null);
  const refToUse = inputRef ?? localRef;
  const hookProps = useTextInput<HTMLInputElement>(refToUse, {
    onEnter,
    onEsc,
    onChange,
    onValueChange,
    selectAllOnMount,
    moveCursorToEndOnMount,
    onDone,
    onMove,
    onFocus,
    onBlur,
    onKeyDown,
    autoFocus,
  });

  const currentIconRight =
    variant === "success"
      ? stenaCheck
      : variant === "warning" || variant === "error"
        ? stenaExclamationTriangle
        : iconRight;

  const currentContentRight =
    variant === "loading" ? <InputSpinner /> : contentRight;

  return (
    <div
      className={cx(
        styles.textInput,
        styles[variant],
        styles[borderRadiusVariant],
        {
          [styles.disabled]: disabled,
        },
        {
          [styles.hideBorder]: hideBorder,
        },
        wrapperClassName,
      )}
      style={{ width, ...wrapperStyle }}
    >
      <TextInputIcon
        content={contentLeft}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={iconLeft}
        spaceOnLeft
        button={buttonLeft}
      />
      <input
        className={cx(
          styles.input,
          {
            [styles.alwaysShowPlaceholder]: alwaysShowPlaceholder,
          },
          className,
        )}
        type={"text"}
        disabled={disabled}
        ref={refToUse}
        autoFocus={autoFocus}
        {...inputProps}
        {...hookProps}
      />
      <TextInputIcon
        content={currentContentRight}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={currentIconRight}
        spaceOnRight
        button={buttonRight}
      />
    </div>
  );
};
