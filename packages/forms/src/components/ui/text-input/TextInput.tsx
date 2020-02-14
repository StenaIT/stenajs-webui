import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { InputProps } from "@stenajs-webui/core";
import classNames from "classnames/bind";
import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { useTextInput } from "../../../hooks/UseTextInput";
import { FullOnChangeProps } from "../types";
import { MoveDirection } from "./SimpleTextInput";
import styles from "./TextInput.module.css";
import { TextInputIcon } from "./TextInputIcon";

let cx = classNames.bind(styles);

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
  /** Color of the icon on the left side. */
  iconColorLeft?: string;
  /** Color of the icon on the right side. */
  iconColorRight?: string;
}

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps,
    ExtraContent {
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
  inputRef,
  className,
  disabled,
  contentLeft,
  contentRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
  iconLeft,
  iconRight,
  iconColorLeft = "var(--swui-textinput-icon-color)",
  iconColorRight = "var(--swui-textinput-icon-color)",
  onClickLeft,
  onClickRight,
  ...inputProps
}) => {
  const internalRef = useRef(null);
  const refToUse = inputRef || internalRef;
  const hookProps = useTextInput(refToUse, inputProps);
  return (
    <div className={cx(styles.textInput, styles.inputContainer, { disabled })}>
      <TextInputIcon
        content={contentLeft}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={iconLeft}
        iconColor={iconColorLeft}
        iconSize={"var(--swui-textinput-icon-size)"}
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
        content={contentRight}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        icon={iconRight}
        iconColor={iconColorRight}
        spaceOnRight
        onClick={onClickRight}
      />
    </div>
  );
};
