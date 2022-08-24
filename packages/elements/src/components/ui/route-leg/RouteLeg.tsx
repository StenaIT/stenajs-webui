import * as React from "react";
import styles from "./RouteLeg.module.css";
import { Box, Column, Row, Space, Txt } from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import { cssColor } from "@stenajs-webui/theme";
import {
  stenaCheckCircle,
  stenaShip,
  stenaTrain,
} from "../../../icons/ui/IconsUi";

export type ModeOfTransport = "ship" | "rail";
export type RouteLegSize = "standard" | "compact" | "relaxed";

interface LocationAndTimeProps {
  location: string;
  date: string;
  time: string;
}

const LocationAndTime: React.FC<
  LocationAndTimeProps & { size: RouteLegSize }
> = ({ location, date, time, size }) => {
  if (size === "compact") {
    return (
      <Row gap={2} justifyContent={"space-between"}>
        <Txt size={"small"}>{location}</Txt>
        <Row gap>
          <Txt size={"small"} variant={"bold"}>
            {date}
          </Txt>
          <Txt size={"small"} variant={"bold"}>
            {time}
          </Txt>
        </Row>
      </Row>
    );
  }
  if (size === "relaxed") {
    return (
      <Column gap={0.5}>
        <Txt size={"large"} variant={"bold"}>
          {location}
        </Txt>
        <Row gap>
          <Txt size={"small"} variant={"bold"}>
            {date}
          </Txt>
          <Txt size={"small"} variant={"bold"}>
            {time}
          </Txt>
        </Row>
      </Column>
    );
  }
  return (
    <Column gap={0.5}>
      <Txt>{location}</Txt>
      <Row gap>
        <Txt variant={"bold"}>{date}</Txt>
        <Txt variant={"bold"}>{time}</Txt>
      </Row>
    </Column>
  );
};

export interface RouteLegProps {
  variant: ModeOfTransport;
  departure: LocationAndTimeProps;
  arrival: LocationAndTimeProps;
  size?: RouteLegSize;
  label?: string;
  isFinal?: boolean;
  selected?: boolean;
  children?: React.ReactNode;
}

export const RouteLeg: React.FC<RouteLegProps> = ({
  variant,
  departure,
  arrival,
  size = "standard",
  label,
  selected = false,
  isFinal = false,
  children,
}) => {
  const icon = variant === "ship" ? stenaShip : stenaTrain;

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
          <Icon
            icon={icon}
            fixedWidth
            color={cssColor("--lhds-color-ui-700")}
            size={24}
          />
          <Box
            flex={1}
            border={`1px solid ${cssColor("--lhds-color-ui-300")}`}
            borderRadius={2}
          />
          {isFinal ? (
            <Box
              flex={"none"}
              border={`4px solid ${cssColor("--lhds-color-blue-100")}`}
              background={cssColor("--lhds-color-blue-500")}
              width={16}
              height={16}
              borderRadius={8}
            />
          ) : (
            <Box
              flex={"none"}
              border={`2px solid ${cssColor("--lhds-color-ui-300")}`}
              width={8}
              height={8}
              borderRadius={8}
            />
          )}
        </Column>
        <Column gap={size === "standard" ? 3 : 2}>
          <LocationAndTime
            location={departure.location}
            date={departure.date}
            time={departure.time}
            size={size}
          />
          <LocationAndTime
            location={arrival.location}
            date={arrival.date}
            time={arrival.time}
            size={size}
          />
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
