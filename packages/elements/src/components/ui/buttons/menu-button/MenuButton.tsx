import * as React from "react";
import { forwardRef, ReactNode } from "react";
import {
  Box,
  ButtonElementProps,
  Indent,
  Row,
  Space,
} from "@stenajs-webui/core";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { cssColor } from "@stenajs-webui/theme";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../../icon/Icon";
import { MenuButtonContent } from "./MenuButtonContent";

export type MenuButtonVariant = "standard" | "danger";

export interface MenuButtonProps extends ButtonElementProps {
  label: string;
  expanded?: boolean;
  expandable?: boolean;
  selected?: boolean;
  leftIcon?: IconDefinition;
  variant?: MenuButtonVariant;
  children?: ReactNode;
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
      children,
      disabled,
      variant = "standard",
      ...buttonProps
    }: MenuButtonProps,
    ref
  ) {
    return (
      <Box
        className={cx(
          styles.menuButton,
          disabled && styles.disabled,
          styles[variant]
        )}
        aria-expanded={expanded}
      >
        <Box
          width={"100%"}
          borderRadius={"99rem"}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <button
            className={cx(
              styles.button,
              selected ? styles.selected : undefined,
              className
            )}
            disabled={disabled}
            ref={ref}
            {...buttonProps}
          >
            <Row justifyContent={"space-between"} indent={2}>
              <MenuButtonContent label={label} leftIcon={leftIcon} />
              {expandable && (
                <Row>
                  <Indent />
                  <Icon
                    icon={expanded ? faChevronUp : faChevronDown}
                    size={12}
                    color={cssColor("--lhds-color-blue-600")}
                  />
                </Row>
              )}
            </Row>
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
  }
);
