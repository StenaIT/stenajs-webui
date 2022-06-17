import * as React from "react";
import styles from "./TextInput.module.css";
import classNames from "classnames/bind";
import { TextInputProps } from "./TextInput";
import { TextInputIcon } from "./TextInputIcon";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { InputSpinner } from "@stenajs-webui/elements";
import { Row } from "@stenajs-webui/core";
import { ReactNode } from "react";

const cx = classNames.bind(styles);

export interface TextInputBoxProps
  extends Pick<
    TextInputProps,
    | "variant"
    | "wrapperClassName"
    | "disabled"
    | "wrapperStyle"
    | "contentLeft"
    | "contentRight"
    | "disableContentPadding"
    | "disableContentPaddingLeft"
    | "disableContentPaddingRight"
    | "iconRight"
    | "iconLeft"
    | "onClickLeft"
    | "onClickRight"
  > {
  children?: ReactNode;
}

export const TextInputBox: React.FC<TextInputBoxProps> = ({
  variant = "standard",
  disabled,
  wrapperClassName,
  wrapperStyle,
  contentLeft,
  contentRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
  iconRight,
  iconLeft,
  onClickLeft,
  onClickRight,
  children,
}) => {
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
      className={cx(
        styles.textInput,
        styles.inputContainer,
        styles[variant],
        {
          [styles.disabled]: disabled,
        },
        wrapperClassName
      )}
      style={wrapperStyle}
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
      <Row alignItems={"center"}>{children}</Row>
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
