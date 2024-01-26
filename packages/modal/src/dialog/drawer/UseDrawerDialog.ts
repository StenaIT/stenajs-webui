import React from "react";
import { DialogOptions, useDialog, UseDialogResult } from "../UseDialog";
import cx from "classnames";
import styles from "./DrawerDialog.module.css";
import { SlideFrom } from "../../common-types";

interface DrawerOptions
  extends Partial<Omit<DialogOptions, "disableCloseOnClickOutside">> {}

export function useDrawerDialog<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  slideFrom: SlideFrom = "left",
  options?: DrawerOptions
): UseDialogResult<TProps, TPromiseResolve> {
  return useDialog<TProps, TPromiseResolve>(component, {
    ...options,
    disableCloseOnClickOutside: true,
    modal: false,
    closingClassName: cx(options?.closingClassName, styles.closing),
    contentWrapperClassName: cx(
      options?.contentWrapperClassName,
      styles.contentWrapper
    ),
    className: cx(options?.className, styles.drawerDialog, styles[slideFrom]),
  });
}
