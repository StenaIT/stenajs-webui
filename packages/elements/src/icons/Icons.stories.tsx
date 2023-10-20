import * as React from "react";
import { IconDemoList } from "./IconsDemo";
import * as commonIcons from "./generated/CommonIcons";
import * as vehicleTypeIcons from "./generated/VehicleTypeIcons";

export default {
  title: "elements/Icons",
};

export const CommonIcons = () => {
  return <IconDemoList icons={Object.values(commonIcons)} />;
};

export const VehicleTypeIcons = () => {
  return <IconDemoList icons={Object.values(vehicleTypeIcons)} />;
};
