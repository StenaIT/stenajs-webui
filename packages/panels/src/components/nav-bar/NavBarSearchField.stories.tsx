import * as React from "react";
import { NavBar } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarSearchField } from "./NavBarSearchField";

export default {
  title: "panels/NavBar/NavBarSearchField",
  component: NavBarSearchField,
  parameters: {
    layout: "fullscreen",
  },
};

export const CenterContent = () => (
  <NavBar center={<NavBarSearchField />}>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
  </NavBar>
);
