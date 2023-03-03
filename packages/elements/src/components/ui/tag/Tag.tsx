import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDataProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { CSSProperties } from "react";
import { labelStyle, tagStandardTheme, tagClassName } from "./Tag.css";

export interface TagProps {
  variant?: TagVariant;
  label?: string;
  size?: TagSize;
  className?: string;
  theme?: string;
  style?: CSSProperties;
  icon?: IconDefinition;
}

export type TagVariant = "info" | "error" | "warning" | "success" | "passive";

export type TagSize = "medium" | "small";

export const Tag: React.FC<TagProps> = ({
  className,
  style,
  variant,
  theme = tagStandardTheme,
  size,
  label,
  icon,
  ...rest
}) => {
  return (
    <div
      className={cx(theme, tagClassName({ variant, size }))}
      style={style}
      {...getDataProps(rest)}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <span className={labelStyle}>{label}</span>
    </div>
  );
};
