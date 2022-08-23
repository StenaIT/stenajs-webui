import * as React from "react";
import { Column, Row, Txt } from "@stenajs-webui/core";
import { Icon } from "../../icon/Icon";
import styles from "./RouteLegBanner.module.css";
import cx from "classnames";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons/faHourglassHalf";

export type RouteLegBannerVariant = "info" | "warning";

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
    <div className={cx(styles.banner, styles[variant])}>
      <Row>
        <Row
          flex={"none"}
          width={"64px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon icon={faHourglassHalf} size={24} className={styles.icon} />
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
