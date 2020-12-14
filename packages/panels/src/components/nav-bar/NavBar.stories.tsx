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
  Space,
  Text,
  useBoolean,
  useOnClickOutside,
} from "@stenajs-webui/core";
import { FlatButton, Icon, WithBadge } from "@stenajs-webui/elements";
import * as React from "react";
import { useRef } from "react";
import { TextInput } from "@stenajs-webui/forms";
import { ClassNames } from "@emotion/core";
import { NavBar } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarPopoverButton } from "./NavBarPopoverButton";
import { cssColor } from "@stenajs-webui/theme";
import { Drawer } from "../drawer/Drawer";
import { SidebarMenu } from "../sidebar-menu/SidebarMenu";
import { SidebarMenuHeading } from "../sidebar-menu/SidebarMenuHeading";
import { SidebarMenuLink } from "../sidebar-menu/SidebarMenuLink";
import {
  faBook,
  faChartBar,
  faPaperPlane,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarMenuCollapsible } from "../sidebar-menu/SidebarMenuCollapsible";
import { SidebarMenuSeparator } from "../sidebar-menu/SidebarMenuSeparator";

export default {
  title: "panels/NavBar",
  component: NavBar,
  subcomponents: { NavBarButton, NavBarMenuButton: NavBarPopoverButton },
};

export const Demo = () => {
  const [isOpen, open, close] = useBoolean(false);
  const ref = useRef(null);
  useOnClickOutside(ref, close);
  const onClick = () => {};

  return (
    <div ref={ref}>
      <Drawer isOpen={isOpen} width={"250px"}>
        <Column width={"100%"}>
          <SidebarMenu onCloseClick={close}>
            <SidebarMenuHeading label={"Product name"} />
            <SidebarMenuLink
              onClick={() => alert("Clicked Customers")}
              leftIcon={faUserFriends}
              label={"Level 1.1"}
            />
            <SidebarMenuLink
              onClick={() => alert("Clicked Customers")}
              label={"No icon"}
            />
            <SidebarMenuLink
              onClick={() => alert("Clicked Customers")}
              loading
              label={"Spinner"}
            />
            <SidebarMenuLink
              onClick={() => alert("Clicked Customers")}
              selected
              label={"Selected"}
            />
            <SidebarMenuCollapsible label={"Level 1.2"} leftIcon={faChartBar}>
              <SidebarMenuLink indent label={"Level 2.1"} onClick={onClick} />
              <SidebarMenuLink indent label={"Level 2.2"} onClick={onClick} />
              <SidebarMenuLink
                indent
                label={"Level 2.3"}
                onClick={onClick}
                selected
              />
              <SidebarMenuLink indent label={"Level 2.4"} onClick={onClick} />
            </SidebarMenuCollapsible>

            <SidebarMenuSeparator />

            <SidebarMenuHeading label={"Support"} />
            <SidebarMenuLink
              leftIcon={faBook}
              label={"User manual"}
              onClick={() => alert("Click on quick guide")}
            />
            <SidebarMenuLink
              leftIcon={faPaperPlane}
              label={"Contact"}
              onClick={() => alert("Click on contact")}
            />

            <Box>
              <Box spacing={8}>
                <Icon
                  icon={faPaperPlane}
                  color={"var(--swui-white)"}
                  size={50}
                  data-hover={true}
                />
              </Box>
            </Box>
          </SidebarMenu>
        </Column>
      </Drawer>
      <NavBar showMenuButton onClickMenuButton={open} variant={"dark"}>
        <NavBarButton label={"Customers"} selected />
        <NavBarButton label={"Bookings"} />
        <NavBarButton label={"Events"} />
      </NavBar>
    </div>
  );
};

export const Standard = () => (
  <NavBar>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const WithTitle = () => (
  <NavBar
    left={
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

export const WithButtonIcons = () => (
  <Column height={"500px"}>
    <NavBar>
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  </Column>
);

export const WithSidebarMenu = () => (
  <Column height={"500px"}>
    <NavBar variant={"standard"} showMenuButton>
      <NavBarButton label={"Customers"} leftIcon={faFire} selected />
      <NavBarButton label={"Bookings"} leftIcon={faCoffee} />
      <NavBarButton label={"Events"} leftIcon={faAddressCard} />
    </NavBar>
  </Column>
);

export const WithSidebarMenuDark = () => (
  <Column height={"500px"}>
    <NavBar
      variant={"dark"}
      showMenuButton
      left={
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

export const CenterContent = () => (
  <NavBar
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

export const CenterContentDark = () => (
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

export const RightContent = () => (
  <NavBar
    right={
      <Row>
        <NavBarButton label={"Profile"} selected />
        <Space />
        <NavBarButton label={"Settings"} />
      </Row>
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
      <NavBarPopoverButton
        label={"Click me"}
        leftIcon={faFire}
        content={({ close }) => (
          <>
            <Box
              width={"200px"}
              height={"200px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>Hello</Text>
            </Box>
            <Row>
              <FlatButton label={"Close"} onClick={close} />
            </Row>
          </>
        )}
      />
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
      <WithBadge label={5} variant={"warning"}>
        <NavBarPopoverButton leftIcon={faFire}>
          <Box
            width={"200px"}
            height={"200px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text>Hello</Text>
          </Box>
        </NavBarPopoverButton>
      </WithBadge>
    }
  >
    <NavBarButton label={"Customers"} />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);
