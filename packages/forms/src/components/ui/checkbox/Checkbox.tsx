import * as React from "react";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FullOnChangeProps } from "../types";
import cx from "classnames";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "standard" | "small";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    Omit<ComponentPropsWithoutRef<"input">, "size" | "value"> {
  indeterminate?: boolean;
  size?: CheckboxSize;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      indeterminate = false,
      onChange,
      onValueChange,
      value = false,
      size = "standard",
      className,
      ...inputProps
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>();

    const setRef = (element: HTMLInputElement) => {
      localRef.current = element;
      if (localRef.current) {
        localRef.current.indeterminate = Boolean(indeterminate);
      }
      if (ref) {
        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as MutableRefObject<HTMLInputElement>).current = element;
        }
      }
    };

    const handleInputChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(ev);
        }
        if (onValueChange) {
          onValueChange(ev.target.checked);
        }
      },
      [onChange, onValueChange],
    );

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate, localRef]);

    return (
      <input
        type={"checkbox"}
        className={cx(styles.checkbox, styles[size], className)}
        checked={value}
        onChange={handleInputChange}
        ref={setRef}
        {...inputProps}
      />
    );
  },
);
