import * as React from "react";
import styles from "./RouteLeg.module.css";
import { Box, Column, Row, Space, Txt } from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import { cssColor } from "@stenajs-webui/theme";
import { faShip } from "@fortawesome/free-solid-svg-icons/faShip";
import { faTrain } from "@fortawesome/free-solid-svg-icons/faTrain";

interface LocationAndTimeProps {
  location: string;
  date: string;
  time: string;
}

const LocationAndTime: React.FC<LocationAndTimeProps> = ({
  location,
  date,
  time,
}) => {
  return (
    <Column gap>
      <Txt>{location}</Txt>
      <Row gap={2}>
        <Txt size={"small"} variant={"bold"}>
          {date}
        </Txt>
        <Txt size={"small"} variant={"bold"}>
          {time}
        </Txt>
      </Row>
    </Column>
  );
};

export type ModeOfTransport = "ship" | "rail";

export interface RouteLegProps {
  variant: ModeOfTransport;
  departure: LocationAndTimeProps;
  arrival: LocationAndTimeProps;
  children?: React.ReactNode;
}

export const RouteLeg: React.FC<RouteLegProps> = ({
  variant,
  departure,
  arrival,
  children,
}) => {
  const icon = variant === "ship" ? faShip : faTrain;

  return (
    <div className={styles.routeLeg}>
      <Column alignItems={"center"}>
        <Icon
          icon={icon}
          fixedWidth
          color={cssColor("--lhds-color-ui-700")}
          size={24}
        />
        <Space />
        <Box
          flex={1}
          borderStyle={"solid"}
          borderWidth={1}
          borderColor={cssColor("--lhds-color-ui-300")}
        />
        <Box
          flex={"none"}
          borderStyle={"solid"}
          borderWidth={2}
          borderColor={cssColor("--lhds-color-ui-300")}
          width={8}
          height={8}
          borderRadius={8}
        />
      </Column>
      <Column gap={2}>
        <LocationAndTime
          location={departure.location}
          date={departure.date}
          time={departure.time}
        />
        <LocationAndTime
          location={arrival.location}
          date={arrival.date}
          time={arrival.time}
        />
      </Column>
      {children && (
        <>
          <div />
          <div>{children}</div>
        </>
      )}
    </div>
  );
};
