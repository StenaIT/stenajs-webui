import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import {
  Box,
  Clickable,
  Column,
  LargeText,
  Row,
  StandardText
} from "@stenajs-webui/core";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import { NavBar, NavBarButton, NavBarMenuButton } from "@stenajs-webui/panels";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { TextInput } from "@stenajs-webui/forms";
import { ClassNames } from "@emotion/core";

storiesOf("panels/NavBar", module)
  .add("standard", () => (
    <NavBar>
      <NavBarButton label={"Customers"} selected />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
    </NavBar>
  ))
  .add("with icons", () => (
    <Column height={"500px"}>
      <NavBar>
        <NavBarButton label={"Customers"} leftIcon={faFire} selected />
        <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
        <NavBarButton label={"Events"} leftIcon={faAddressCard} />
      </NavBar>
    </Column>
  ))
  .add("with buttons and centered content", () => (
    <NavBar
      center={
        <ClassNames>
          {({ css }) => (
            <TextInput
              wrapperClassName={css`
                --swui-field-border-color: var(--lhds-color-blue-900);
                --swui-field-bg-enabled: var(--lhds-color-blue-900);
                --swui-field-focus-shadow: inset 0px 0px 3pt 0pt
                  rgba(255, 255, 255, 0.3);
                --swui-field-border-color-hover: var(--lhds-color-ui-300);
                --swui-field-text-color: var(--lhds-color-ui-50);
                --swui-textinput-placeholder-color: var(--lhds-color-ui-50);

                &:focus-within {
                  --swui-field-text-color: var(--swui-field-text-color);
                  --swui-textinput-bg-color: var(--lhds-color-ui-50);
                }
              `}
              placeholder={"Search..."}
              contentRight={
                <Clickable>
                  <Icon icon={faSearch} />
                </Clickable>
              }
            />
          )}
        </ClassNames>
      }
    >
      <NavBarButton label={"Customers"} selected />
      <NavBarButton label={"Bookings"} />
      <NavBarButton label={"Events"} />
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
  .add("with title to left", () => (
    <Column height={"500px"}>
      <NavBar
        height={100}
        right={
          <Row>
            <NavBarButton label={"Profile"} selected />
            <NavBarButton label={"Settings"} />
          </Row>
        }
      >
        <LargeText color={"#fff"}>NavBar Title</LargeText>
      </NavBar>
    </Column>
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
