import * as React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import cx from "classnames";

import styles from "./Chip.module.css";
import {
  FlatButton,
  PrimaryButton,
  PrimaryButtonProps
} from "@stenajs-webui/elements";

export interface ChipProps extends PrimaryButtonProps {
  onClickRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  onClickRemove,
  className,
  label,
  onClick,
  ...props
}) => {
  return (
    <PrimaryButton
      className={cx(styles.chip, className)}
      label={
        <>
          <div className={styles.label}>{label}</div>
          {onClickRemove && (
            <FlatButton
              onClick={onClickRemove}
              leftIcon={faTimes}
              size={"small"}
              className={styles.close}
            />
          )}
        </>
      }
      {...props}
    />
  );
};
