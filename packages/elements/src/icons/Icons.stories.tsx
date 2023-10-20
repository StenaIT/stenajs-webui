import * as React from "react";
import { IconDemoList } from "./IconsDemo";
import * as commonIcons from "./generated/CommonIcons";
import * as vehicleTypeIcons from "./generated/VehicleTypeIcons";
import * as passengerTypeIcons from "./generated/PassengerTypeIcons";

export default {
  title: "elements/Icons",
};

export const CommonIcons = () => {
  return <IconDemoList icons={commonIcons} />;
};

export const VehicleTypeIcons = () => {
  return <IconDemoList icons={vehicleTypeIcons} />;
};

export const PassengerTypeIcons = () => {
  return <IconDemoList icons={passengerTypeIcons} />;
};
