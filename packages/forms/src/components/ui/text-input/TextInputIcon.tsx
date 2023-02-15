import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputFieldButton } from "@stenajs-webui/elements";

export interface TextInputIconProps {
  iconClassName?: string;
  content?: React.ReactNode;
  icon?: IconDefinition;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
  disabled?: boolean;
  disableContentPadding?: boolean;
  disableContentPaddingLeft?: boolean;
  disableContentPaddingRight?: boolean;
  onClick?: () => void;
}

export const TextInputIcon: React.FC<TextInputIconProps> = ({
  icon,
  iconClassName,
  content,
  spaceOnLeft,
  spaceOnRight,
  disabled,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
  onClick,
}) => {
  if (!content && !icon) {
    return null;
  }

  if (content) {
    return (
      <>
        {spaceOnLeft &&
        !(disableContentPadding || disableContentPaddingLeft) ? (
          <Space />
        ) : null}
        {onClick ? (
          <span onClick={onClick} className={styles.clickable}>
            {content || null}
          </span>
        ) : (
          <>{content || null}</>
        )}

        {spaceOnRight &&
        !(disableContentPadding || disableContentPaddingRight) ? (
          <Space />
        ) : null}
      </>
    );
  }

  return (
    <>
      {spaceOnLeft ? <Space num={0.5} /> : null}
      {icon && (
        <>
          {onClick ? (
            <InputFieldButton
              onClick={onClick}
              icon={icon}
              disabled={disabled}
            />
          ) : (
            <FontAwesomeIcon
              icon={icon}
              className={cx(styles.icon, iconClassName)}
            />
          )}
        </>
      )}
      {spaceOnRight ? <Space num={0.5} /> : null}
    </>
  );
};
