import * as React from "react";
import { ReactNode } from "react";
import styles from "./TextInput.module.css";
import cx from "classnames";
import { TextInputProps } from "./TextInput";
import { TextInputIcon } from "./TextInputIcon";
import {
  InputSpinner,
  stenaCheck,
  stenaExclamationTriangle,
  TextInputButton,
} from "@stenajs-webui/elements";
import { ButtonElementProps, Row } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
  > {
  children?: ReactNode;
  iconRight?: IconDefinition;
  iconLeft?: IconDefinition;
  onClickLeft?: ButtonElementProps["onClick"];
  onClickRight?: ButtonElementProps["onClick"];
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
        spaceOnLeft
        button={
          iconLeft ? (
            <TextInputButton onClick={onClickLeft} icon={iconLeft} />
          ) : undefined
        }
      />
      <Row alignItems={"center"}>{children}</Row>
      <TextInputIcon
        content={currentContentRight}
        disableContentPadding={disableContentPadding}
        disableContentPaddingLeft={disableContentPaddingLeft}
        disableContentPaddingRight={disableContentPaddingRight}
        spaceOnRight
        button={
          currentIconRight ? (
            <TextInputButton onClick={onClickRight} icon={currentIconRight} />
          ) : undefined
        }
      />
    </div>
  );
};
