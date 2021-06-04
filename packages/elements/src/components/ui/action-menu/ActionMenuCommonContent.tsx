import * as React from "react";
import {
  ButtonContent,
  ButtonContentProps,
} from "../buttons/common/ButtonContent";
import { Row } from "@stenajs-webui/core";
import styles from "./ActionMenuItem.module.css";
import cx from "classnames";

export const ActionMenuCommonContent: React.VFC<ButtonContentProps> = ({
  label,
  left,
  leftIcon,
  loading,
  right,
  rightIcon,
  success,
}) => (
  <Row
    alignItems={"center"}
    width={"100%"}
    indent={2}
    className={styles.actionMenuItemInnerContent}
  >
    <ButtonContent
      success={success}
      loading={loading}
      leftIcon={leftIcon}
      left={left}
      right={right}
      rightIcon={rightIcon}
      label={label}
      labelClassName={styles.actionMenuItemLabel}
      iconClassName={styles.actionMenuItemIcon}
      leftWrapperClassName={cx({
        [styles.actionMenuItemIconWrapper]: success || loading || leftIcon,
      })}
    />
  </Row>
);
