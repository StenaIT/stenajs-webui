import React from "react";
import { ModalOptions, useModal, UseModalResult } from "../UseModal";
import cx from "classnames";
import styles from "./ModalDrawer.module.css";

export type SlideFrom = SlideFromLeftRight | SlideFromTopBottom;
export type SlideFromLeftRight = "left" | "right";
export type SlideFromTopBottom = "top" | "bottom";

export function useModalDrawer<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  slideFrom: SlideFrom = "left",
  options?: ModalOptions
): UseModalResult<TProps, TPromiseResolve> {
  return useModal<TProps, TPromiseResolve>(component, {
    ...options,
    closingClassName: cx(options?.closingClassName, styles.closing),
    contentWrapperClassName: cx(
      options?.contentWrapperClassName,
      styles.contentWrapper
    ),
    className: cx(options?.className, styles.modalDrawer, styles[slideFrom]),
  });
}
