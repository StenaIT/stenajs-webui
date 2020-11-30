import * as React from "react";
import styles from "./Tab.module.css";
import cx from "classnames";
import { ButtonElementProps } from "@stenajs-webui/core";
import {
  ButtonContent,
  ButtonContentProps,
} from "../buttons/common/ButtonContent";
import { getButtonLabel } from "../buttons/common/ButtonLabelFactory";

export interface TabProps extends ButtonElementProps, ButtonContentProps {
  selected?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  selected,
  label,
  loading = false,
  left,
  leftIcon,
  right,
  rightIcon,
  success = false,
  ...buttonProps
}) => {
  const buttonLabel = getButtonLabel(
    label,
    success,
    undefined,
    loading,
    undefined
  );

  return (
    <button
      className={cx(styles.tab, selected && styles.selected)}
      {...buttonProps}
    >
      <div className={styles.inner}>
        <ButtonContent
          success={success}
          loading={loading}
          leftIcon={leftIcon}
          left={left}
          right={right}
          rightIcon={rightIcon}
          label={buttonLabel}
        />
      </div>
    </button>
  );
};
