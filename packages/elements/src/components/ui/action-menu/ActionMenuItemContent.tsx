import { Column, DivProps, Row, Space } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, ReactNode } from "react";
import cx from "classnames";
import buttonStyles from "../buttons/common/ButtonContent.module.css";

import styles from "./ActionMenuItem.module.css";
import { ButtonContentProps } from "../buttons/common/ButtonContent";
import { ActionMenuItemVariant } from "./ActionMenuItem";
import { useActionMenuLogic } from "./UseActionMenuLogic";
import { ActionMenuCommonContent } from "./ActionMenuCommonContent";

export interface ActionMenuItemContentProps
  extends DivProps,
    ButtonContentProps {
  variant?: ActionMenuItemVariant;
  disabled?: boolean;
  bottom?: ReactNode;
  fullWidthBottomContent?: boolean;
}

export const ActionMenuItemContent = forwardRef<
  HTMLDivElement,
  ActionMenuItemContentProps
>(function ActionMenuItemContent(
  {
    success,
    loading,
    leftIcon,
    left,
    right,
    rightIcon,
    label,
    iconClassName,
    labelClassName,
    spinnerClassName,
    leftWrapperClassName,
    variant = "standard",
    className,
    disabled,
    bottom,
    fullWidthBottomContent,
    ...props
  },
  ref
) {
  const { onKeyDown, innerRef } = useActionMenuLogic(props, ref);

  return (
    <Column
      {...props}
      className={cx(
        styles.actionMenuItem,
        styles.actionMenuItemContent,
        styles[variant],
        className
      )}
      ref={innerRef}
      onKeyDown={onKeyDown}
      aria-disabled={disabled}
    >
      <ActionMenuCommonContent
        success={success}
        loading={loading}
        leftIcon={leftIcon}
        left={left}
        right={right}
        rightIcon={rightIcon}
        label={label}
      />
      {bottom && (
        <>
          <Row indent={2} width={"100%"}>
            {!fullWidthBottomContent && (success || loading || leftIcon) && (
              <div className={buttonStyles.leftWrapper}>
                <div className={styles.actionMenuItemIconWrapper} />
              </div>
            )}
            <Row alignItems={"center"}>{bottom}</Row>
          </Row>
          <Space num={1.5} />
        </>
      )}
    </Column>
  );
});
