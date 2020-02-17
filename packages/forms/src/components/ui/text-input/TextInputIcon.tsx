import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable, Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./TextInput.module.css";

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
  onClick
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
          <Clickable onClick={onClick} disableFocusHighlight>
            {content || null}
          </Clickable>
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
            <Clickable onClick={onClick} disableFocusHighlight>
              {iconNode || null}
            </Clickable>
          ) : (
            <>{iconNode || null}</>
          )}
        </>
      )}
      {spaceOnRight ? <Space /> : null}
    </>
  );
};
