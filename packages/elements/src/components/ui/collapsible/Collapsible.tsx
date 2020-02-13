import * as React from "react";
import { ReactNode } from "react";
import { config, Spring } from "react-spring/renderprops-universal";
import styles from "./Collapsible.module.css";
import { Icon } from "../../..";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export interface CollapsibleProps {
  label: string;
  contentRight?: ReactNode;
  collapsed?: boolean;
  onCollapse?: () => void;
  disabled?: boolean;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  label,
  contentRight,
  collapsed = false,
  onCollapse = function() {},
  disabled = false,
  children
}) => {
  return (
    <div className={styles.collapsible} aria-expanded={!collapsed}>
      <button
        className={styles.header}
        onClick={onCollapse}
        disabled={disabled}
      >
        <div className={styles.headerText}>{label}</div>
        <div className={styles.contentRight}>{contentRight}</div>
        <Icon icon={faChevronDown} className={styles.chevron} size={8} />
      </button>
      {!collapsed && (
        <Spring config={config.slow} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <div className={styles.content} style={props} role={"region"}>
              {children}
            </div>
          )}
        </Spring>
      )}
    </div>
  );
};
