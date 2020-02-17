import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { InputProps } from "@stenajs-webui/core";
import { InputSpinner } from "@stenajs-webui/elements";
import classNames from "classnames/bind";
import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { useTextInput } from "../../../hooks/UseTextInput";
import { FullOnChangeProps } from "../types";
import { MoveDirection } from "./SimpleTextInput";
import styles from "./TextInput.module.css";
import { TextInputIcon } from "./TextInputIcon";

const cx = classNames.bind(styles);

type TextInputVariant =
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
}

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps,
    ExtraContent {
  variant?: TextInputVariant;
  background?: string;
  selectAllOnFocus?: boolean;
  selectAllOnMount?: boolean;
  moveCursorToEndOnMount?: boolean;
  onDone?: (value: string) => void;
  onEnter?: () => void;
  onEsc?: () => void;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  variant = "standard",
  inputRef,
  background,
  className,
  disabled,
  contentLeft,
  contentRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
  iconLeft,
  iconRight,
  onClickLeft,
  onClickRight,
  ...inputProps
}) => {
  const internalRef = useRef(null);
  const refToUse = inputRef || internalRef;
  const hookProps = useTextInput(refToUse, inputProps);

  const currentIconRight =
    variant === "success"
      ? faCheck
      : variant === "warning" || variant === "error"
      ? faExclamationTriangle
      : iconRight;

  const currentContentRight =
    variant === "loading" ? <InputSpinner /> : contentRight;

  return (
    <div
      className={cx(styles.textInput, styles.inputContainer, styles[variant], {
        disabled
      })}
      style={background ? { background } : undefined}
    >
      <TextInputIcon
        content={contentLeft}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={iconLeft}
        spaceOnLeft
        onClick={onClickLeft}
      />
      <input
        className={cx(className, styles.textInput, styles.input)}
        type={"text"}
        disabled={disabled}
        ref={refToUse}
        {...hookProps}
        {...inputProps}
      />
      <TextInputIcon
        content={currentContentRight}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={currentIconRight}
        spaceOnRight
        onClick={onClickRight}
      />
    </div>
  );
};
