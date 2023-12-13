import * as React from "react";
import { useState } from "react";
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

export const CenterContent = () => {
  const [text, setText] = useState<string>("");
  return (
    <NavBar
      center={
        <NavBarSearchField
          showClearButton
          onClickClearButton={() => setText("")}
          value={text}
          onValueChange={setText}
        />
      }
    >
      <NavBarButton label={"Customers"} selected />
      <NavBarButton label={"Bookings"} />
    </NavBar>
  );
};
