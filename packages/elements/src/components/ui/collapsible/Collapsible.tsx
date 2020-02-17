import * as React from "react";
import { ReactNode, useRef } from "react";
import styles from "./Collapsible.module.css";
import { Icon } from "../../..";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CSSTransition from "react-transition-group/CSSTransition";

export interface CollapsibleProps {
  label: string;
  contentRight?: ReactNode;
  collapsed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
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
  contentRight,
  collapsed = false,
  onClick,
  disabled = false,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const chevronColor = ref.current
    ? getComputedStyle(ref.current).getPropertyValue(
        !collapsed || disabled
          ? "--swui-collapsible-header-chevron-color"
          : "--swui-collapsible-header-chevron-color-collapsed"
      )
    : undefined;

  const timeout = ref.current
    ? mapCSSTime(
        getComputedStyle(ref.current).getPropertyValue(
          "--swui-collapsible-animation-time"
        )
      )
    : undefined;

  return (
    <div className={styles.collapsible} aria-expanded={!collapsed} ref={ref}>
      <button className={styles.header} onClick={onClick} disabled={disabled}>
        <div className={styles.headerText}>{label}</div>
        <div className={styles.contentRight}>{contentRight}</div>
        <Icon
          icon={faChevronDown}
          className={styles.chevron}
          size={8}
          rotation={collapsed ? undefined : 180}
          color={chevronColor}
        />
      </button>
      <CSSTransition
        in={!collapsed}
        timeout={{
          enter: timeout
        }}
        classNames={{
          enter: styles.contentEnter,
          enterActive: styles.contentEnterActive
        }}
        unmountOnExit={true}
      >
        <div role={"region"} className={styles.content}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};
