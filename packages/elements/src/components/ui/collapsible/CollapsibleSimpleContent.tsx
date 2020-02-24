import * as React from 'react';
import { ReactNode } from 'react';

import styles from './Collapsible.module.css';

export interface CollapsibleContentProps {
  contentLeft?: ReactNode;
  label: string;
  contentRight?: ReactNode;
}

export const CollapsibleSimpleContent: React.FC<CollapsibleContentProps> = ({
  contentLeft,
  label,
  contentRight
}) => {
  return (
    <div className={styles.content}>
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      <div className={styles.label}>{label}</div>
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </div>
  );
};
