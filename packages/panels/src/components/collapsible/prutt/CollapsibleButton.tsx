import * as React from "react";
import {
  Box,
  ButtonElementProps,
  Indent,
  Row,
  Space,
  Text,
} from "@stenajs-webui/core";
import cx from "classnames";
import { Icon } from "@stenajs-webui/elements";
import styles from "./CollapsibleButton.module.css";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cssColor } from "@stenajs-webui/theme";
import { CollapsibleGroupBox } from "./CollapsibleGroupBox";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface CollapsibleButtonProps extends ButtonElementProps {
  label: string;
  expanded?: boolean;
  expandable?: boolean;
  selected?: boolean;
  leftIcon?: IconDefinition;
  children?: ReactNode;
}

export const CollapsibleButton: React.FC<CollapsibleButtonProps> = ({
  label,
  expanded,
  expandable,
  selected,
  className,
  leftIcon,
  children,
  ...buttonProps
}) => {
  return (
    <Box
      className={styles.collapsibleButton}
      background={"var(--current-background-color)"}
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
          {...buttonProps}
        >
          <Row justifyContent={"space-between"} indent={2}>
            <Row>
              {leftIcon && (
                <>
                  <Box
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"16px"}
                  >
                    <Icon
                      icon={leftIcon}
                      size={16}
                      color={"var(--current-text-color)"}
                      data-hover={true}
                    />
                  </Box>
                  <Indent />
                </>
              )}
              <Text variant={"bold"} className={styles.label}>
                {label}
              </Text>
            </Row>
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
          <CollapsibleGroupBox>{children}</CollapsibleGroupBox>
        </>
      )}
    </Box>
  );
};
