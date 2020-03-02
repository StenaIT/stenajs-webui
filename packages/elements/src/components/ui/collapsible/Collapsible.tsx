import * as React from "react";
import { ReactNode, useRef } from "react";
import styles from "./Collapsible.module.css";
import { Icon } from "../../..";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CSSTransition from "react-transition-group/CSSTransition";
import { Clickable } from "@stenajs-webui/core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface CollapsibleProps {
  label: string;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  collapsed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  unmountOnCollapse?: boolean;
  icon?: IconDefinition;
  iconCollapsed?: IconDefinition;
  iconSize?: number;
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

export const Collapsible: React.FC<CollapsibleProps> = ({
  label,
  contentLeft,
  contentRight,
  collapsed = false,
  onClick,
  disabled = false,
  unmountOnCollapse = false,
  icon = faChevronDown,
  iconCollapsed = faChevronUp,
  iconSize = 8,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const timeout = ref.current
    ? mapCSSTime(
        getComputedStyle(ref.current).getPropertyValue(
          "--swui-collapsible-animation-time"
        )
      )
    : undefined;

  return (
    <div className={styles.collapsible} aria-expanded={!collapsed} ref={ref}>
      <Clickable
        disableFocusHighlight
        disableOpacityOnClick
        className={styles.header}
        onClick={onClick}
        disabled={disabled}
      >
        {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
        <div className={styles.label}>{label}</div>
        {contentRight && (
          <div className={styles.contentRight}>{contentRight}</div>
        )}
        <Icon
          icon={collapsed ? iconCollapsed : icon}
          className={styles.indicator}
          size={iconSize}
        />
      </Clickable>
      <CSSTransition
        in={!collapsed}
        timeout={{
          enter: timeout
        }}
        classNames={{
          enter: styles.contentEnter,
          enterActive: styles.contentEnterActive,
          exit: styles.contentExit,
          exitActive: styles.contentExitActive,
          exitDone: styles.contentExitDone
        }}
        unmountOnExit={unmountOnCollapse}
      >
        <div role={"region"}>{children}</div>
      </CSSTransition>
    </div>
  );
};
