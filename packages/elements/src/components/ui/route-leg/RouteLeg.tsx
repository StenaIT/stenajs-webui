import * as React from "react";
import styles from "./RouteLeg.module.css";
import { Box, Column, Row, Space, Txt } from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import { cssColor } from "@stenajs-webui/theme";
import {
  stenaCheckCircle,
  stenaSailingShip,
  stenaSailingTrain,
} from "../../../icons/ui/IconsUi";

export type ModeOfTransport = "ship" | "rail";
export type RouteLegSize = "standard" | "compact" | "relaxed";

interface LocationAndTimeProps {
  location: string;
  originalDateTime?: string;
  dateTime: string;
}

const LocationAndTime: React.FC<
  LocationAndTimeProps & { size: RouteLegSize }
> = ({ location, dateTime, originalDateTime, size }) => {
  if (size === "compact") {
    return (
      <Row gap={2} justifyContent={"space-between"}>
        <Txt size={"small"}>{location}</Txt>
        <Column>
          {originalDateTime && (
            <Txt
              size={"small"}
              variant={"bold"}
              color={cssColor("--lhds-color-ui-600")}
              style={{ textDecoration: "line-through" }}
            >
              {originalDateTime}
            </Txt>
          )}
          <Txt size={"small"} variant={"bold"}>
            {dateTime}
          </Txt>
        </Column>
      </Row>
    );
  }
  if (size === "relaxed") {
    return (
      <Column gap={0.5}>
        <Txt size={"large"} variant={"bold"}>
          {location}
        </Txt>
        <Column>
          {originalDateTime && (
            <Txt
              size={"small"}
              variant={"bold"}
              color={cssColor("--lhds-color-ui-600")}
              style={{ textDecoration: "line-through" }}
            >
              {originalDateTime}
            </Txt>
          )}
          <Txt size={"small"} variant={"bold"}>
            {dateTime}
          </Txt>
        </Column>
      </Column>
    );
  }
  return (
    <Column gap={0.5}>
      <Txt>{location}</Txt>
      <Column>
        {originalDateTime && (
          <Txt
            variant={"bold"}
            color={cssColor("--lhds-color-ui-600")}
            style={{ textDecoration: "line-through" }}
          >
            {originalDateTime}
          </Txt>
        )}
        <Txt variant={"bold"}>{dateTime}</Txt>
      </Column>
    </Column>
  );
};

export interface RouteLegProps {
  variant: ModeOfTransport;
  departure: LocationAndTimeProps;
  arrival: LocationAndTimeProps;
  label?: string;
  size?: RouteLegSize;
  selected?: boolean;
  children?: React.ReactNode;
}

export const RouteLeg: React.FC<RouteLegProps> = ({
  variant,
  departure,
  arrival,
  label,
  size = "standard",
  selected = false,
  children,
}) => {
  const icon = variant === "ship" ? stenaSailingShip : stenaSailingTrain;

  return (
    <div className={styles.routeLeg}>
      {label && (
        <>
          <Txt variant={"overline"} size={"smaller"}>
            {label}
          </Txt>
          <Space num={2} />
        </>
      )}
      {selected && (
        <Icon
          icon={stenaCheckCircle}
          size={16}
          color={cssColor("--lhds-color-blue-600")}
          className={styles.selectedIcon}
        />
      )}
      <div className={styles.grid}>
        <Column alignItems={"center"} gap={0.5}>
          <Icon icon={icon} fixedWidth size={24} />
          <Box
            flex={1}
            border={`1px solid ${cssColor("--lhds-color-ui-300")}`}
            borderRadius={2}
          />
          <Box
            flex={"none"}
            border={`4px solid ${cssColor("--lhds-color-blue-100")}`}
            background={cssColor("--lhds-color-blue-500")}
            width={16}
            height={16}
            borderRadius={8}
          />
        </Column>
        <Column gap={size === "standard" ? 3 : 2}>
          <LocationAndTime {...departure} size={size} />
          <LocationAndTime {...arrival} size={size} />
        </Column>
        {children && (
          <>
            <div />
            <div>{children}</div>
          </>
        )}
      </div>
    </div>
  );
};
