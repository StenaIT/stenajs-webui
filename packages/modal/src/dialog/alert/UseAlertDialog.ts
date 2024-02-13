import * as React from "react";
import { DialogOptions, useDialog, UseDialogResult } from "../UseDialog";
import cx from "classnames";
import styles from "./AlertDialog.module.css";

export function useAlertDialog<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  options?: Partial<DialogOptions>
): UseDialogResult<TProps, TPromiseResolve> {
  return useDialog<TProps, TPromiseResolve>(component, {
    ...options,
    modal: true,
    closingClassName: cx(options?.closingClassName, styles.closing),
    contentWrapperClassName: cx(
      options?.contentWrapperClassName,
      styles.contentWrapper
    ),
    className: cx(options?.className, styles.alertDialog),
  });
}
