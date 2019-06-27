import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { Box, Row, StandardText } from "@stenajs-webui/core";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import { NavBar, NavBarButton, NavBarMenuButton } from "@stenajs-webui/panels";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("panels/NavBar", module)
  .add("standard", () => (
    <NavBar>
      <NavBarButton label={"Customers"} selected />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with icons", () => (
    <NavBar>
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  ))
  .add("with right buttons", () => (
    <NavBar
      right={
        <Row>
          <NavBarButton label={"Profile"} selected />
          <NavBarButton label={"Settings"} />
        </Row>
      }
    >
      <NavBarButton label={"Customers"} />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with right icon", () => (
    <NavBar right={<Icon icon={faFire} />}>
      <NavBarButton label={"Customers"} />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with right icon with badge", () => (
    <NavBar
      right={
        <WithBadge label={5}>
          <Icon icon={faFire} />
        </WithBadge>
      }
    >
      <NavBarButton label={"Customers"} />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with menu button", () => (
    <NavBar
      right={
        <NavBarMenuButton label={"Click me"} leftIcon={faFire}>
          <Box
            width={"200px"}
            height={"200px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <StandardText>Hello</StandardText>
          </Box>
        </NavBarMenuButton>
      }
    >
      <NavBarButton label={"Customers"} />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with menu button icon", () => (
    <NavBar
      right={
        <NavBarMenuButton
          buttonContent={
            <Box spacing indent>
              <WithBadge label={5}>
                <Icon icon={faFire} />
              </WithBadge>
            </Box>
          }
        >
          <Box
            width={"200px"}
            height={"200px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <StandardText>Hello</StandardText>
          </Box>
        </NavBarMenuButton>
      }
    >
      <NavBarButton label={"Customers"} />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ));
