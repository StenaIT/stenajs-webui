import * as React from "react";
import { forwardRef } from "react";
import { Box, ButtonElementProps, Row } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MenuButtonVariant } from "./MenuButton";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { Icon } from "../../icon/Icon";

export interface IconMenuButtonProps extends ButtonElementProps {
  selected?: boolean;
  icon: IconDefinition;
  variant?: MenuButtonVariant;
}

export const IconMenuButton = forwardRef<
  HTMLButtonElement,
  IconMenuButtonProps
>(function (
  { selected, className, icon, disabled, variant = "standard", ...buttonProps },
  ref,
) {
  return (
    <Box
      className={cx(styles.menuButton)}
      width={"100%"}
      borderRadius={"99rem"}
      overflow={"hidden"}
      flexShrink={0}
    >
      <button
        className={cx(
          styles.button,
          selected && styles.selected,
          disabled && styles.disabled,
          styles.iconOnly,
          styles[variant],
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...buttonProps}
      >
        <Row justifyContent={"center"} alignItems={"center"} indent={1}>
          <Box alignItems={"center"} justifyContent={"center"} width={"20px"}>
            <Icon
              icon={icon}
              size={20}
              color={"var(--current-text-color)"}
              data-hover={true}
            />
          </Box>
        </Row>
      </button>
    </Box>
  );
});
