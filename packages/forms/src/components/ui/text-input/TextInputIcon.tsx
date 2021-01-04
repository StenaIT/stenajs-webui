import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TextInputIconProps {
  iconClassName?: string;
  content?: React.ReactNode;
  icon?: IconDefinition;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
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

  const iconNode = icon && (
    <FontAwesomeIcon icon={icon} className={cx(styles.icon, iconClassName)} />
  );

  return (
    <>
      {spaceOnLeft ? <Space /> : null}
      {iconNode && (
        <>
          {onClick ? (
            <span onClick={onClick} className={styles.clickable}>
              {iconNode || null}
            </span>
          ) : (
            <>{iconNode || null}</>
          )}
        </>
      )}
      {spaceOnRight ? <Space /> : null}
    </>
  );
};
