import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable, Space } from "@stenajs-webui/core";
import styles from "./TextInput.module.css";
import * as React from "react";

export interface TextInputIconProps {
  content?: React.ReactNode;
  icon?: IconDefinition;
  iconSize?: string;
  iconColor?: string;
  spaceOnRight?: boolean;
  spaceOnLeft?: boolean;
  disableContentPadding?: boolean;
  disableContentPaddingLeft?: boolean;
  disableContentPaddingRight?: boolean;
  onClick?: () => void;
}

export const TextInputIcon: React.FC<TextInputIconProps> = ({
  icon,
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
          !(disableContentPadding || disableContentPaddingLeft) && <Space />}
        {onClick ? (
          <Clickable onClick={onClick} disableFocusHighlight>
            {content}
          </Clickable>
        ) : (
          <>{content}</>
        )}

        {spaceOnRight &&
          !(disableContentPadding || disableContentPaddingRight) && <Space />}
      </>
    );
  }

  const iconNode = icon && (
    <FontAwesomeIcon icon={icon} className={styles.icon} />
  );

  //     <Icon icon={icon} color={iconColor} size={iconSize} />

  return (
    <>
      {spaceOnLeft && <Space />}
      {iconNode && (
        <>
          {onClick ? (
            <Clickable onClick={onClick} disableFocusHighlight>
              {iconNode}
            </Clickable>
          ) : (
            <>{iconNode}</>
          )}
        </>
      )}
      {spaceOnRight && <Space />}
    </>
  );
};
