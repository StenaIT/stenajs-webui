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
  tabIndex = 0, // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
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
      role={"tab"}
      aria-selected={selected}
      tabIndex={tabIndex}
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
