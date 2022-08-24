import * as React from "react";
import { Column, Row, Txt } from "@stenajs-webui/core";
import { Icon } from "../../icon/Icon";
import styles from "./RouteLegBanner.module.css";
import cx from "classnames";
import { stenaClock } from "../../../../icons/ui/IconsUi";

export type RouteLegBannerVariant = "info" | "warning";

export interface RouteLegTimeTagProps {
  text: string;
  variant?: RouteLegBannerVariant;
}

export interface RouteLegBannerProps {
  headerText: string;
  text: string;
  variant?: RouteLegBannerVariant;
}

export const RouteLegBanner: React.FC<RouteLegBannerProps> = ({
  headerText,
  text,
  variant = "info",
}) => {
  return (
    <div className={cx(styles.timeBanner, styles[variant])}>
      <Row>
        <Row
          flex={"none"}
          width={"64px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon icon={stenaClock} size={24} className={styles.icon} />
        </Row>
        <Column justifyContent={"center"} gap>
          {headerText && (
            <Txt variant={"overline"} size={"smaller"}>
              {headerText}
            </Txt>
          )}
          {text && <Txt>{text}</Txt>}
        </Column>
      </Row>
    </div>
  );
};

export const RouteLegTimeTag: React.FC<RouteLegTimeTagProps> = ({
  text,
  variant = "info",
}) => {
  return (
    <div className={cx(styles.timeTag, styles[variant])}>
      <Row flex={"none"} alignItems={"center"} gap>
        <Icon icon={stenaClock} size={16} className={styles.icon} />
        <Txt variant={"overline"} size={"smaller"}>
          {text}
        </Txt>
      </Row>
    </div>
  );
};
