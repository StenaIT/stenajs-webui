import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Box,
  Column,
  getDataProps,
  Heading,
  Indent,
  Row,
  Space,
  Text,
} from "@stenajs-webui/core";
import { Icon } from "../../icon/Icon";
import styles from "./Banner.module.css";
import cx from "classnames";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Spinner } from "../../spinner/Spinner";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

export type BannerVariant =
  | "standard"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BannerProps {
  icon?: IconDefinition;
  headerText?: string;
  text?: string;
  loading?: boolean;
  contentRight?: ReactNode;
  variant?: BannerVariant;
}

const iconPerVariant: Record<BannerVariant, IconDefinition | undefined> = {
  standard: faExclamationCircle,
  info: faExclamationCircle,
  success: faCheckCircle,
  warning: faExclamationCircle,
  error: faExclamationTriangle,
};

export const Banner: React.FC<BannerProps> = ({
  headerText,
  text,
  children,
  contentRight,
  icon,
  variant = "standard",
  loading = false,
  ...rest
}) => {
  return (
    <div className={cx(styles.banner, styles[variant])} {...getDataProps(rest)}>
      <Row justifyContent={"space-between"}>
        <Row
          flex={"none"}
          width={"64px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {(icon || iconPerVariant[variant] || loading) && (
            <>
              {loading ? (
                <Spinner size={"tiny"} color={"var(--current-icon-color)"} />
              ) : (
                <Icon
                  icon={icon ?? iconPerVariant[variant]}
                  size={24}
                  className={styles.icon}
                />
              )}
            </>
          )}
        </Row>
        <Row justifyContent={"space-between"} flexGrow={1}>
          <Column justifyContent={"center"}>
            {headerText && (
              <>
                <Heading variant={"h5"}>{headerText}</Heading>
              </>
            )}
            {text && (
              <>
                {headerText && <Space />}
                <Text>{text}</Text>
              </>
            )}
          </Column>
          {contentRight && (
            <>
              <Indent />
              <Column justifyContent={"center"}>{contentRight}</Column>
            </>
          )}
        </Row>
      </Row>
      {children && (
        <Row>
          <Box minWidth={"64px"} />
          <Box>
            <>
              <Space />
              {children}
            </>
          </Box>
        </Row>
      )}
    </div>
  );
};
