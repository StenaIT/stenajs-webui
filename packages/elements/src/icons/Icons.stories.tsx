import * as React from "react";
import { IconDemoList, XlIconDemo } from "./IconsDemo";
import * as arrowIcons from "./generated/ArrowIcons";
import * as businessIcons from "./generated/BusinessIcons";
import * as commonIcons from "./generated/CommonIcons";
import * as passengerTypeIcons from "./generated/PassengerTypeIcons";
import * as travelIcons from "./generated/TravelIcons";
import * as vehicleTypeIcons from "./generated/VehicleTypeIcons";
import * as userIcons from "./generated/UserIcons";
import * as xlIcons from "./generated/XlIcons";

export default {
  title: "elements/Icons",
};

export const CommonIcons = () => {
  return <IconDemoList icons={commonIcons} />;
};

export const ArrowIcons = () => {
  return <IconDemoList icons={arrowIcons} />;
};

export const BusinessIcons = () => {
  return <IconDemoList icons={businessIcons} />;
};

export const PassengerTypeIcons = () => {
  return <IconDemoList icons={passengerTypeIcons} />;
};

export const TravelIcons = () => {
  return (
    <IconDemoList
      icons={travelIcons}
      iconSize={80}
      renderIconDemo={(selectedIcon) => <XlIconDemo icon={selectedIcon} />}
    />
  );
};

export const VehicleTypeIcons = () => {
  return <IconDemoList icons={vehicleTypeIcons} />;
};

export const UserIcons = () => {
  return <IconDemoList icons={userIcons} />;
};

export const XlIcons = () => {
  return (
    <IconDemoList
      icons={xlIcons}
      iconSize={80}
      renderIconDemo={(selectedIcon) => <XlIconDemo icon={selectedIcon} />}
    />
  );
};
