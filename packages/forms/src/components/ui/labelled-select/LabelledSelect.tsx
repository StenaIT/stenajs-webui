import * as React from "react";
import { Icon, stenaAngleDown } from "@stenajs-webui/elements";
import cx from "classnames";
import { ChangeEvent, PropsWithChildren, useCallback } from "react";
import { InputLabel } from "../input-label/InputLabel";
import styles from "./LabelledSelect.module.css";
import { cssColor } from "@stenajs-webui/theme";
import { ValueAndOnValueChangeProps } from "../types";

export type SelectBorderVariant =
  | "normalBorder"
  | "onlyTopBorder"
  | "onlyBottomBorder";

export interface LabelledSelectProps
  extends ValueAndOnValueChangeProps<string>,
    PropsWithChildren {
  id?: string;
  name: string;
  label?: string;
  screenReaderLabel?: string;
  borderVariant?: SelectBorderVariant;
  variant?: LabelledSelectVariant;
}

export type LabelledSelectVariant = "normal" | "error";

export const LabelledSelect: React.FC<LabelledSelectProps> = ({
  id,
  name,
  value,
  onValueChange,
  label,
  screenReaderLabel,
  borderVariant = "normalBorder",
  variant = "normal",
  children,
  ...inputProps
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    },
    [onValueChange]
  );

  return (
    <div
      className={cx(
        styles.labelledSelect,
        styles[variant],
        styles[borderVariant]
      )}
    >
      <InputLabel
        htmlFor={id}
        className={styles.label}
        label={label}
        screenReaderLabel={screenReaderLabel}
      />
      <select
        className={cx(styles.select, styles[variant])}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...inputProps}
      >
        {children}
      </select>

      <div className={cx(styles.iconWrapper)}>
        <Icon
          icon={stenaAngleDown}
          size={24}
          color={cssColor("--modern-blue")}
        />
      </div>
    </div>
  );
};
