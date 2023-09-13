import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Box,
  Column,
  getDataProps,
  Heading,
  Row,
  Space,
  Text,
} from "@stenajs-webui/core";

import { Icon } from "../../icon/Icon";
import styles from "./Banner.module.css";
import cx from "classnames";
import { Spinner } from "../../spinner/Spinner";
import {
  stenaCheck,
  stenaExclamationCircle,
  stenaExclamationTriangle,
  stenaInfoMegaphone,
  stenaInfoSpeech,
} from "../../../../icons/ui/IconsUi";

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
  children?: ReactNode;
}

const iconPerVariant: Record<BannerVariant, IconDefinition | undefined> = {
  standard: stenaExclamationCircle,
  info: stenaInfoSpeech,
  success: stenaCheck,
  warning: stenaInfoMegaphone,
  error: stenaExclamationTriangle,
};

const leftContentWidth = "56px";

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
    <Column
      className={cx(styles.banner, styles[variant])}
      spacing={children || (headerText && text) ? 2 : 1}
      indent={2}
      {...getDataProps(rest)}
    >
      <Row justifyContent={"space-between"}>
        <Row flex={"none"} width={leftContentWidth} alignItems={"center"}>
          <div className={styles.iconBackground}>
            {(icon || iconPerVariant[variant] || loading) && (
              <>
                {loading ? (
                  <Spinner size={"tiny"} />
                ) : (
                  <Icon
                    icon={icon ?? iconPerVariant[variant]}
                    size={20}
                    className={styles.icon}
                  />
                )}
              </>
            )}
          </div>
        </Row>
        <Row justifyContent={"space-between"} flexGrow={1} gap>
          <Column justifyContent={"center"} gap>
            {headerText && <Heading variant={"h5"}>{headerText}</Heading>}
            {text && <Text>{text}</Text>}
          </Column>
          {contentRight && (
            <Column justifyContent={"center"}>{contentRight}</Column>
          )}
        </Row>
      </Row>
      {children && (
        <Row>
          <Box minWidth={leftContentWidth} />
          <Box>
            <Space />
            {children}
          </Box>
        </Row>
      )}
    </Column>
  );
};
