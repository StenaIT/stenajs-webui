import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import {
  Box,
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
import { NavBar, NavBarProps } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarPopoverButton } from "./NavBarPopoverButton";
import { cssColor } from "@stenajs-webui/theme";
import { Drawer } from "@stenajs-webui/modal";
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
import { Story } from "@storybook/react";
import { NavBarSearchField } from "./NavBarSearchField";
import { NavBarHeading } from "./NavBarHeading";

export default {
  title: "panels/NavBar",
  component: NavBar,
  subcomponents: { NavBarButton, NavBarMenuButton: NavBarPopoverButton },
};

export const Demo: Story<Pick<NavBarProps, "variant">> = ({ variant }) => {
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
      <NavBar
        showMenuButton
        onClickMenuButton={open}
        variant={variant}
        left={<NavBarHeading>Stena line</NavBarHeading>}
        right={
          <Row>
            <NavBarButton label={"Profile"} selected />
            <Space />
            <NavBarButton label={"Settings"} />
          </Row>
        }
        center={<NavBarSearchField />}
      >
        <NavBarButton label={"Customers"} leftIcon={faUsers} selected />
        <NavBarButton label={"Bookings"} />
        <NavBarButton label={"Events"} />
      </NavBar>
    </div>
  );
};

export const Dark = () => {
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
      <NavBar
        showMenuButton
        onClickMenuButton={open}
        variant={"dark"}
        left={<NavBarHeading>Stena line</NavBarHeading>}
        right={
          <Row>
            <NavBarButton label={"Profile"} selected />
            <Space />
            <NavBarButton label={"Settings"} />
          </Row>
        }
        center={<NavBarSearchField />}
      >
        <NavBarButton label={"Customers"} selected />
        <NavBarButton label={"Bookings"} />
        <NavBarButton label={"Events"} />
      </NavBar>
    </div>
  );
};

export const NoButtons = () => (
  <NavBar
    showMenuButton
    left={<NavBarHeading>Stena line</NavBarHeading>}
    right={
      <Row>
        <NavBarButton label={"Profile"} selected />
        <Space />
        <NavBarButton label={"Settings"} />
      </Row>
    }
  />
);

export const DarkNoButtons = () => (
  <NavBar
    showMenuButton
    variant={"dark"}
    left={<NavBarHeading>Stena line</NavBarHeading>}
    right={
      <Row>
        <NavBarButton label={"Profile"} selected />
        <Space />
        <NavBarButton label={"Settings"} />
      </Row>
    }
  />
);

export const NoMenuOrTitle = () => (
  <NavBar>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const TitleNoMenu = () => (
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

export const MenuNoTitle = () => (
  <NavBar showMenuButton>
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

export const CenterContent = () => (
  <NavBar center={<NavBarSearchField />}>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const CenterContentDark = () => (
  <NavBar variant={"dark"} center={<NavBarSearchField />}>
    <NavBarButton label={"Customers"} selected />
    <NavBarButton label={"Bookings"} />
    <NavBarButton label={"Events"} />
  </NavBar>
);

export const PopoverButton = () => (
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

export const PopoverButtonIcon = () => (
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
