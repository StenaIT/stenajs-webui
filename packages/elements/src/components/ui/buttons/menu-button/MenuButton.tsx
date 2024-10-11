import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { Box, ButtonElementProps, Space } from "@stenajs-webui/core";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { cssColor } from "@stenajs-webui/theme";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../../icon/Icon";
import { MenuButtonContent } from "./internal/MenuButtonContent";
import {
  stenaAngleDown,
  stenaAngleUp,
} from "../../../../icons/generated/ArrowIcons";
import { stenaCheck } from "../../../../icons/generated/CommonIcons";
import { InputSpinner } from "../../spinner/InputSpinner";

export type MenuButtonVariant = "standard" | "danger" | "success";

export interface MenuButtonProps extends ButtonElementProps {
  label: string;
  expanded?: boolean;
  expandable?: boolean;
  selected?: boolean;
  leftIcon?: IconDefinition;
  left?: ReactNode;
  right?: ReactNode;
  rightIcon?: IconDefinition;
  variant?: MenuButtonVariant;
  children?: ReactNode;
  success?: boolean;
  loading?: boolean;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function (
    {
      label,
      expanded,
      expandable,
      selected,
      className,
      leftIcon,
      rightIcon,
      children,
      disabled,
      variant = "standard",
      left,
      right,
      success = false,
      loading = false,
      ...buttonProps
    },
    ref,
  ) {
    const iconOnly = !label && !expandable;

    return (
      <Box>
        <Box
          aria-expanded={expanded}
          className={cx(styles.menuButton)}
          width={"100%"}
        >
          <button
            className={cx(
              styles.button,
              selected && styles.selected,
              disabled && styles.disabled,
              styles[variant],
              label ? styles.hasLabel : undefined,
              iconOnly && styles.iconOnly,
              className,
            )}
            disabled={disabled}
            ref={ref}
            {...buttonProps}
          >
            <MenuButtonContent
              label={label}
              leftIcon={leftIcon}
              left={left}
              right={loading ? <InputSpinner /> : right}
              rightIcon={success ? stenaCheck : rightIcon}
            />
            {expandable && (
              <Icon
                icon={expanded ? stenaAngleUp : stenaAngleDown}
                size={18}
                color={cssColor("--lhds-color-blue-600")}
              />
            )}
          </button>
        </Box>

        {expanded && (
          <>
            <Space />
            <MenuButtonGroupBox>{children}</MenuButtonGroupBox>
          </>
        )}
      </Box>
    );
  },
);
