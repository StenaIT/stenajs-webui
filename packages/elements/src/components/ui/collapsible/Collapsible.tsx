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

const chevronColor = (
  ref: HTMLElement | null,
  collapsed: boolean,
  disabled: boolean
) => {
  if (!ref) {
    return undefined;
  }

  if (!collapsed || disabled) {
    return getComputedStyle(ref).getPropertyValue(
      "--swui-collapsible-header-chevron-color"
    );
  } else {
    return getComputedStyle(ref).getPropertyValue(
      "--swui-collapsible-header-chevron-color-collapsed"
    );
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
          color={chevronColor(ref.current, collapsed, disabled)}
        />
      </button>
      <CSSTransition
        in={!collapsed}
        timeout={250}
        classNames={{
          enter: styles.contentEnter,
          enterActive: styles.contentEnterActive,
          exit: styles.contentExit,
          exitActive: styles.contentExitActive
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
