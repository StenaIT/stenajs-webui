import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import {
  Box,
  Column,
  Heading,
  Row,
  Space,
  Text,
  useBoolean,
} from "@stenajs-webui/core";
import {
  ActionMenuItem,
  ActionMenuItemContent,
  ActionMenuSeparator,
  FlatButton,
  PrimaryButton,
  SecondaryButton,
  stenaBusinessClaim,
  stenaBusinessInvoice,
  stenaCalendar,
  stenaClean,
  stenaClock,
  stenaCog,
  stenaHelp,
  stenaPlus,
  stenaSailingTicket,
  stenaSignOut,
  stenaSlidersMini,
  stenaStatisticsBar,
  stenaStatisticsLine,
  stenaStatusNoShow,
  stenaUserMultiple,
  WithBadge,
} from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import { NavBar, NavBarProps } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarPopoverButton } from "./NavBarPopoverButton";
import { cssColor } from "@stenajs-webui/theme";
import { Drawer } from "@stenajs-webui/modal";
import { SidebarMenu } from "../sidebar-menu/SidebarMenu";
import { SidebarMenuHeading } from "../sidebar-menu/items/SidebarMenuHeading";
import { SidebarMenuLink } from "../sidebar-menu/items/SidebarMenuLink";
import { SidebarMenuCollapsible } from "../sidebar-menu/items/SidebarMenuCollapsible";
import { Story } from "@storybook/react";
import { NavBarHeading } from "./NavBarHeading";
import { SidebarRailMenu } from "../sidebar-menu/rail/SidebarRailMenu";
import { NavBarUserButton } from "./NavBarUserButton";
import { NavBarNotificationButton } from "./NavBarNotificationButton";

export default {
  title: "panels/NavBar",
  component: NavBar,
  parameters: {
    layout: "fullscreen",
  },
  subcomponents: { NavBarButton, NavBarMenuButton: NavBarPopoverButton },
};

export const Demo: Story<Pick<NavBarProps, "variant">> = ({ variant }) => {
  const [isOpen, open, close] = useBoolean(false);
  const [pinned, , unpin, togglePin] = useBoolean(false);
  const onClick = () => {};

  const sidebarMenuItems = (
    <>
      <SidebarMenuHeading label={"Freight portal"} />
      <SidebarMenuLink href={"#"} leftIcon={stenaCalendar} label={"Manage"} />
      <SidebarMenuLink
        href={"#"}
        label={"Book (selected)"}
        leftIcon={stenaSailingTicket}
        selected
      />
      <SidebarMenuLink
        href={"#"}
        label={"Statistics"}
        leftIcon={stenaStatisticsLine}
      />
      <SidebarMenuHeading label={"Administration"} />
      <SidebarMenuCollapsible
        label={"Invoices"}
        leftIcon={stenaBusinessInvoice}
      >
        <SidebarMenuLink label={"No show & late handling"} onClick={onClick} />
        <SidebarMenuLink label={"Late payment"} onClick={onClick} />
        <SidebarMenuLink
          label={"Archive (selected)"}
          onClick={onClick}
          selected
        />
        <SidebarMenuLink label={"Level 2.4"} onClick={onClick} />
        <SidebarMenuCollapsible
          label={"Level 2.5"}
          leftIcon={stenaStatisticsBar}
        >
          <SidebarMenuLink label={"Level 3.1"} onClick={onClick} />
          <SidebarMenuLink label={"Level 3.2"} onClick={onClick} />
          <SidebarMenuCollapsible
            label={"Level 3.3"}
            leftIcon={stenaStatisticsBar}
          >
            <SidebarMenuLink label={"Level 4.1"} onClick={onClick} />
            <SidebarMenuLink label={"Level 4.2"} onClick={onClick} />
          </SidebarMenuCollapsible>
        </SidebarMenuCollapsible>
      </SidebarMenuCollapsible>

      <SidebarMenuCollapsible label={"No icon"}>
        <SidebarMenuLink label={"Level 2"} onClick={onClick} />
      </SidebarMenuCollapsible>

      <SidebarMenuHeading label={"Support"} />
      <SidebarMenuLink
        leftIcon={stenaBusinessClaim}
        label={"Make a claim"}
        href={"#"}
      />
      <SidebarMenuLink
        leftIcon={stenaStatusNoShow}
        label={"No show, late handling"}
        href={"#"}
      />
    </>
  );

  const bottomItems = (
    <>
      <SidebarMenuLink leftIcon={stenaClock} label={"Timetable"} href={"#"} />
      <SidebarMenuLink leftIcon={stenaHelp} label={"Help"} href={"#"} />
      <SidebarMenuLink
        leftIcon={stenaSlidersMini}
        label={"Settings"}
        href={"#"}
      />
    </>
  );

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} width={"250px"}>
        <Column>
          <SidebarMenu
            onCloseClick={close}
            pinButtonVisible
            onClickPinButton={togglePin}
            isPinned={pinned}
            bottomItems={bottomItems}
          >
            {sidebarMenuItems}
          </SidebarMenu>
        </Column>
      </Drawer>
      {pinned && (
        <SidebarRailMenu
          onClickMenuButton={open}
          closeButtonVisible
          onClickCloseButton={unpin}
          bottomItems={bottomItems}
        >
          {sidebarMenuItems}
        </SidebarRailMenu>
      )}
      <NavBar
        showMenuButton={!pinned}
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
      >
        <NavBarButton
          label={"Customers"}
          leftIcon={stenaUserMultiple}
          selected
        />
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

export const UserButton = () => (
  <Column gap>
    <NavBar
      right={
        <NavBarUserButton
          username={"USR007"}
          renderItems={() => (
            <>
              <ActionMenuItemContent label={"user@example.com"} />
              <ActionMenuSeparator />
              <ActionMenuItem leftIcon={stenaCog} label={"Manage account"} />
              <ActionMenuItem leftIcon={stenaSignOut} label={"Logout"} />
            </>
          )}
        />
      }
    />
    <NavBar
      right={
        <NavBarUserButton
          initials={"U7"}
          renderItems={() => (
            <>
              <ActionMenuItemContent label={"user@example.com"} />
              <ActionMenuSeparator />
              <ActionMenuItem leftIcon={stenaCog} label={"Manage account"} />
              <ActionMenuItem leftIcon={stenaSignOut} label={"Logout"} />
            </>
          )}
        />
      }
    />
  </Column>
);

export const NotificationButton = () => {
  const [unread, setUnread, clearUnread] = useBoolean(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar
        right={<NavBarNotificationButton count={count} unread={unread} />}
      />
      <Column indent spacing gap alignItems={"flex-end"}>
        <PrimaryButton
          leftIcon={stenaPlus}
          label={"Trigger notification"}
          onClick={() => {
            setCount((c) => c + 1);
            setUnread();
          }}
        />
        <SecondaryButton
          label={"Mark as read"}
          disabled={!unread}
          onClick={() => {
            clearUnread();
          }}
        />
        <SecondaryButton
          leftIcon={stenaClean}
          label={"Clear all"}
          disabled={count === 0}
          onClick={() => {
            setCount(0);
            clearUnread();
          }}
        />
      </Column>
    </>
  );
};
