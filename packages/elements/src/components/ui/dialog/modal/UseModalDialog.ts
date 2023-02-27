import React from "react";
import { DialogOptions, useDialog, UseDialogResult } from "../UseDialog";
import cx from "classnames";
import styles from "./ModalDialog.module.css";

export function useModalDialog<TProps, TPromiseResolve = void>(
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
    className: cx(options?.className, styles.modalDialog),
  });
}
