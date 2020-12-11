import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import {
  Box,
  Clickable,
  Column,
  Heading,
  Row,
  Text,
} from "@stenajs-webui/core";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import * as React from "react";
import { TextInput } from "@stenajs-webui/forms";
import { ClassNames } from "@emotion/core";
import { NavBar } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarMenuButton } from "./NavBarMenuButton";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "panels/NavBar",
  component: NavBar,
  subcomponents: { NavBarButton, NavBarMenuButton },
};

export const Standard = () => (
  <NavBar>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const StandardWithApplicationName = () => (
  <NavBar
    logoOrAppName={
      <Heading variant={"h4"} color={cssColor("--lhds-color-ui-50")}>
        Stena WebUI
      </Heading>
    }
  >
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const Dark = () => (
  <NavBar variant={"dark"}>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const WithIcons = () => (
  <Column height={"500px"}>
    <NavBar>
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  </Column>
);

export const WithHamburgerMenuAndIconsStandard = () => (
  <Column height={"500px"}>
    <NavBar variant={"standard"} hamburgerMenu>
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  </Column>
);

export const WithHamburgerMenuAndIconsWithAppNameDark = () => (
  <Column height={"500px"}>
    <NavBar
      variant={"dark"}
      hamburgerMenu
      logoOrAppName={
        <Heading variant={"h4"} color={cssColor("--lhds-color-ui-50")}>
          Stena WebUI
        </Heading>
      }
    >
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  </Column>
);

export const WithButtonsAndCenteredContentStandard = () => (
  <NavBar
    variant={"standard"}
    center={
      <ClassNames>
        {({ css }) => (
          <TextInput
            wrapperClassName={css`
              --swui-field-border-color: var(--lhds-color-blue-600);
              --swui-field-bg-enabled: var(--lhds-color-blue-600);
              --swui-field-focus-shadow: inset 0px 0px 3pt 0pt
                rgba(255, 255, 255, 0.3);
              --swui-field-border-color-hover: var(--lhds-color-ui-300);
              --swui-field-text-color: var(--lhds-color-ui-50);
              --swui-textinput-placeholder-color: var(--lhds-color-ui-50);
              --swui-textinput-bg-color: var(--lhds-color-blue-600);
              --swui-textinput-border-color: var(--lhds-color-blue-600);
              --swui-textinput-border-color-hover: var(--lhds-color-ui-50);

              &:focus-within {
                --swui-field-text-color: var(--swui-field-text-color);
                --swui-textinput-icon-color: var(--lhds-color-ui-500);
                --swui-textinput-bg-color: var(--lhds-color-ui-50);
              }
            `}
            placeholder={"Search..."}
            contentRight={
              <Clickable>
                <Icon icon={faSearch} color={cssColor("--lhds-color-ui-50")} />
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
);

export const WithButtonsAndCenteredContentDark = () => (
  <NavBar
    variant={"dark"}
    center={
      <ClassNames>
        {({ css }) => (
          <TextInput
            wrapperClassName={css`
              --swui-field-border-color: var(--lhds-color-blue-900);
              --swui-field-bg-enabled: var(--lhds-color-blue-900);
              --swui-field-focus-shadow: inset 0px 0px 3pt 0pt
                rgba(255, 255, 255, 0.3);
              /*--swui-field-border-color-hover: var(--lhds-color-ui-300);*/
              --swui-field-text-color: var(--lhds-color-ui-50);
              --swui-textinput-placeholder-color: var(--lhds-color-ui-50);
              --swui-textinput-bg-color: var(--lhds-color-blue-900);
              --swui-textinput-border-color: var(--lhds-color-blue-900);
              --swui-textinput-border-color-hover: var(--lhds-color-ui-50);

              &:focus-within {
                --swui-field-text-color: var(--swui-field-text-color);
                --swui-textinput-bg-color: var(--lhds-color-ui-50);
              }
            `}
            placeholder={"Search..."}
            contentRight={
              <Clickable>
                <Icon icon={faSearch} color={cssColor("--lhds-color-ui-50")} />
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
);

export const WithRightButtons = () => (
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
);

export const WithTitleToLeft = () => (
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
      <Text size={"large"} color={"#fff"}>
        NavBar Title
      </Text>
    </NavBar>
  </Column>
);

export const WithRightIcon = () => (
  <NavBar right={<Icon icon={faFire} />}>
    <NavBarButton label={"Customers"} />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const WithRightIconWithBadge = () => (
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
);

export const WithMenuButton = () => (
  <NavBar
    right={
      <NavBarMenuButton label={"Click me"} leftIcon={faFire}>
        <Box
          width={"200px"}
          height={"200px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>Hello</Text>
        </Box>
      </NavBarMenuButton>
    }
  >
    <NavBarButton label={"Customers"} />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const WithMenuButtonIcon = () => (
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
          <Text>Hello</Text>
        </Box>
      </NavBarMenuButton>
    }
  >
    <NavBarButton label={"Customers"} />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);
