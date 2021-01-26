import * as React from "react";
import { ReactNode } from "react";
import styles from "./Crumb.module.css";

export interface CrumbProps {
  label: string;
  render?: (props: CrumbRenderProps) => ReactNode;
}

export interface CrumbRenderProps {
  className: string;
  children: ReactNode;
}

export const Crumb: React.FC<CrumbProps> = ({ label, render }) => {
  if (render) {
    const children = label.toUpperCase();
    return <>{render({ children, className: styles.crumb })}</>;
  }
  return <span className={styles.crumb}>{label.toUpperCase()}</span>;
};
