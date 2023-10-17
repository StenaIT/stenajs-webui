import * as React from "react";
import { ReactNode } from "react";
import styles from "./UnreadDot.module.css";

export interface UnreadDotProps {
  children: ReactNode;
}

export const UnreadDot: React.FC<UnreadDotProps> = ({ children }) => {
  return (
    <div className={styles.unreadDot}>
      {children}
      <div className={styles.dot} />
    </div>
  );
};
