import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TextInputIconProps {
  iconClassName?: string;
  content?: React.ReactNode;
  button?: React.ReactNode;
  icon?: IconDefinition;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
  disableContentPadding?: boolean;
  disableContentPaddingLeft?: boolean;
  disableContentPaddingRight?: boolean;
}

export const TextInputIcon: React.FC<TextInputIconProps> = ({
  button,
  icon,
  iconClassName,
  content,
  spaceOnLeft,
  spaceOnRight,
  disableContentPadding,
  disableContentPaddingLeft,
  disableContentPaddingRight,
}) => {
  if (!content && !icon && !button) {
    return null;
  }

  if (button) {
    return (
      <>
        {spaceOnLeft ? <Space num={0.25} /> : null}
        {button}
        {spaceOnRight ? <Space num={0.25} /> : null}
      </>
    );
  }

  if (content) {
    return (
      <>
        {spaceOnLeft &&
        !(disableContentPadding || disableContentPaddingLeft) ? (
          <Space />
        ) : null}
        {content || null}
        {spaceOnRight &&
        !(disableContentPadding || disableContentPaddingRight) ? (
          <Space />
        ) : null}
      </>
    );
  }

  return (
    <>
      {spaceOnLeft ? <Space /> : null}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={cx(styles.icon, iconClassName)}
        />
      )}
      {spaceOnRight ? <Space /> : null}
    </>
  );
};
