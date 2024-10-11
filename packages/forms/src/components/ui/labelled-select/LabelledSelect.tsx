import * as React from "react";
import { ChangeEvent, PropsWithChildren, useCallback, useId } from "react";
import { Icon, stenaAngleDown } from "@stenajs-webui/elements";
import cx from "classnames";
import { InputLabel } from "../input-label/InputLabel";
import styles from "./LabelledSelect.module.css";
import { cssColor } from "@stenajs-webui/theme";
import { ValueAndOnValueChangeProps } from "../types";
import { SelectElementProps } from "@stenajs-webui/core";

export type SelectBorderVariant =
  | "normalBorder"
  | "onlyTopBorder"
  | "onlyBottomBorder";

export interface LabelledSelectProps
  extends ValueAndOnValueChangeProps<string>,
    PropsWithChildren,
    Omit<SelectElementProps, "value"> {
  id?: string;
  name: string;
  label?: string;
  screenReaderLabel?: string;
  borderVariant?: SelectBorderVariant;
  variant?: LabelledSelectVariant;
}

export type LabelledSelectVariant = "normal" | "error";

export const LabelledSelect: React.FC<LabelledSelectProps> = ({
  onChange,
  onValueChange,
  id,
  label,
  screenReaderLabel,
  borderVariant = "normalBorder",
  variant = "normal",
  children,
  ...inputProps
}) => {
  const hookId = useId();

  const activeId = id ?? hookId;

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    },
    [onChange, onValueChange],
  );

  return (
    <div
      className={cx(
        styles.labelledSelect,
        styles[variant],
        styles[borderVariant],
      )}
    >
      <InputLabel
        htmlFor={activeId}
        className={styles.label}
        label={label}
        screenReaderLabel={screenReaderLabel}
      />
      <select
        id={activeId}
        onChange={onChangeHandler}
        className={cx(styles.select, styles[variant])}
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
