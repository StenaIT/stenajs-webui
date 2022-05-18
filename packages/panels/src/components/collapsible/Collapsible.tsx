import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { Clickable, ClickableProps, DivProps, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Collapsible.module.css";
import { CollapsibleContent } from "./CollapsibleContent";
import { CollapsibleEmptyContent } from "./CollapsibleEmptyContent";

export interface CollapsibleProps
  extends Omit<DivProps, "onClick">,
    Pick<ClickableProps, "onClick"> {
  label: string;
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  collapsed?: boolean;
  disabled?: boolean;
  unmountOnCollapse?: boolean;
  mountOnEnter?: boolean;
  icon?: IconDefinition;
  iconCollapsed?: IconDefinition;
  iconSize?: number;
  autoFocus?: boolean;
}

export const mapCSSTime = (value: string): number => {
  const num = parseFloat(value);
  const match = value.match(/m?s/);

  switch (match?.[0]) {
    case "s":
      return num * 1000;
    case "ms":
      return num;
    default:
      return 0;
  }
};

export const Collapsible = forwardRef<HTMLButtonElement, CollapsibleProps>(
  function Collapsible(
    {
      label,
      contentLeft,
      contentRight,
      collapsed = false,
      onClick,
      className,
      disabled = false,
      unmountOnCollapse = false,
      mountOnEnter = true,
      icon = faChevronUp,
      iconCollapsed = faChevronDown,
      iconSize = 8,
      children,
      autoFocus = false,
      ...divProps
    },
    ref
  ) {
    const divRef = React.useRef<HTMLDivElement>(null);

    const timeout = divRef.current
      ? mapCSSTime(
          getComputedStyle(divRef.current).getPropertyValue(
            "--swui-collapsible-animation-time"
          )
        )
      : undefined;

    return (
      <div
        className={cx(styles.collapsible, className)}
        aria-expanded={!collapsed}
        ref={divRef}
        {...divProps}
      >
        <Clickable
          disableFocusHighlight
          disableOpacityOnClick
          className={styles.header}
          onClick={onClick}
          disabled={disabled}
          autoFocus={autoFocus}
          ref={ref}
        >
          {contentLeft && (
            <div className={styles.contentLeft}>{contentLeft}</div>
          )}
          <div className={styles.label}>
            <Text
              color={"var(--swui-collapsible-header-text-color)"}
              className={styles.headerText}
            >
              {label}
            </Text>
          </div>
          {contentRight && (
            <div className={styles.contentRight}>{contentRight}</div>
          )}
          <Icon
            icon={collapsed ? iconCollapsed : icon}
            className={styles.indicator}
            size={iconSize}
            fixedWidth
          />
        </Clickable>
        <CSSTransition
          in={!collapsed}
          timeout={{
            enter: timeout,
          }}
          classNames={{
            enter: styles.contentEnter,
            enterActive: styles.contentEnterActive,
            exit: styles.contentExit,
            exitActive: styles.contentExitActive,
            exitDone: styles.contentExitDone,
          }}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnCollapse}
        >
          <div role={"region"}>
            {children ?? (
              <CollapsibleContent>
                <CollapsibleEmptyContent />
              </CollapsibleContent>
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
);
