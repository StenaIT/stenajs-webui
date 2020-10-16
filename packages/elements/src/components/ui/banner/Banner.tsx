import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Column,
  Indent,
  Row,
  Space,
  Spacing,
  StandardText,
} from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import styles from "./Banner.module.css";
import cx from "classnames";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Spinner } from "../spinner/Spinner";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

export type BannerVariant = "standard" | "info" | "success" | "error";

export interface BannerProps {
  icon?: IconDefinition;
  headerText?: string;
  text: string;
  loading?: boolean;
  contentRight?: ReactNode;
  variant?: BannerVariant;
}

const iconPerVariant: Record<BannerVariant, IconDefinition | undefined> = {
  standard: faExclamationCircle,
  info: faExclamationCircle,
  success: faCheckCircle,
  error: faExclamationTriangle,
};

export const Banner: React.FC<BannerProps> = ({
  headerText,
  text,
  children,
  contentRight,
  icon,
  variant = "standard",
  loading,
}) => {
  return (
    <div className={cx(styles.banner, styles[variant])}>
      <Row justifyContent={"space-between"}>
        <Row>
          {(icon || iconPerVariant[variant] || loading) && (
            <>
              <Column justifyContent={"center"}>
                {loading ? (
                  <Spinner size={"small"} color={"var(--current-icon-color)"} />
                ) : (
                  <Icon
                    icon={icon ?? iconPerVariant[variant]}
                    size={24}
                    className={styles.icon}
                  />
                )}
              </Column>
              <Indent />
            </>
          )}
          <Column justifyContent={"center"}>
            {headerText && (
              <>
                <StandardText fontWeight={"bold"}>{headerText}</StandardText>
                <Space />
              </>
            )}
            <StandardText>{text}</StandardText>
          </Column>
        </Row>
        {contentRight && (
          <Column justifyContent={"center"}>{contentRight}</Column>
        )}
      </Row>

      {children && (
        <>
          <Spacing />
          {children}
        </>
      )}
    </div>
  );
};
