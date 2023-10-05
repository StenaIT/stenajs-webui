import * as React from "react";
import {
  Box,
  ButtonElementProps,
  Indent,
  Row,
  Space,
} from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { forwardRef, ReactNode } from "react";
import { MenuButtonProps, MenuButtonVariant } from "./MenuButton";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { MenuButtonContent } from "./MenuButtonContent";
import { Icon } from "../../icon/Icon";
import { stenaAngleDown, stenaAngleUp } from "../../../../icons/ui/IconsUi";
import { cssColor } from "@stenajs-webui/theme";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";

export interface IconMenuButtonProps extends ButtonElementProps {
  selected?: boolean;
  icon?: IconDefinition;
  variant?: MenuButtonVariant;
}

export const IconMenuButton = forwardRef<
  HTMLButtonElement,
  IconMenuButtonProps
>(function (
  {
    selected,
    className,
    icon,
    children,
    disabled,
    variant = "standard",
    ...buttonProps
  },
  ref
) {
  return (
    <Box>
      <Box
        className={cx(styles.menuButton)}
        width={"100%"}
        borderRadius={"99rem"}
        overflow={"hidden"}
      >
        <button
          className={cx(
            styles.button,
            selected && styles.selected,
            disabled && styles.disabled,
            styles[variant],
            className
          )}
          disabled={disabled}
          ref={ref}
          {...buttonProps}
        >
          <Row
            justifyContent={iconOnly ? "center" : "space-between"}
            alignItems={"center"}
            indent={1}
          >
            <MenuButtonContent label={label} leftIcon={leftIcon} />
            <Row gap={1} alignItems={"center"}>
              {right && <Row alignItems={"center"}>{right}</Row>}
              {expandable && (
                <Row>
                  <Indent />
                  <Icon
                    icon={expanded ? stenaAngleUp : stenaAngleDown}
                    size={18}
                    color={cssColor("--lhds-color-blue-600")}
                  />
                </Row>
              )}
            </Row>
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
});
