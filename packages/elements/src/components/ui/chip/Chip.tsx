import * as React from "react";
import { Clickable } from "@stenajs-webui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Icon } from "../icon/Icon";
import { Label, LabelProps } from "../label/Label";
import cx from "classnames";

import styles from "./Chip.module.css";

export interface ChipProps extends LabelProps {
  text: string;
  onClickLabel?: () => void;
  onClickRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  text,
  onClickLabel,
  onClickRemove,
  className,
  ...props
}) => {
  return (
    <Label className={cx(styles.chip, className)} {...props}>
      <Clickable onClick={onClickLabel} className={styles.label}>
        {text}
      </Clickable>
      <Clickable onClick={onClickRemove} className={styles.close}>
        <Icon icon={faTimes} size={8} />
      </Clickable>
    </Label>
  );
};
