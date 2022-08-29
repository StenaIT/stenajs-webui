import * as React from "react";
import { Row, Txt } from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import styles from "./TimeTag.module.css";
import cx from "classnames";
import { stenaClock } from "../../../icons/ui/IconsUi";

export type TimeTagVariant = "waiting" | "total";

export interface TimeTagProps {
  label: string;
  variant?: TimeTagVariant;
}

export const TimeTag: React.FC<TimeTagProps> = ({
  label,
  variant = "waiting",
}) => {
  return (
    <div className={cx(styles.timeTag, styles[variant])}>
      <Row flex={"none"} alignItems={"center"} gap>
        <Icon icon={stenaClock} size={16} className={styles.icon} />
        <Txt variant={"overline"} size={"smaller"}>
          {label}
        </Txt>
      </Row>
    </div>
  );
};
