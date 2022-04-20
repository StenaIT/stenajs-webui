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
} from "@stenajs-webui/core";
import { FlatButton, Icon, WithBadge } from "@stenajs-webui/elements";
import * as React from "react";
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
import { NavBarHeading } from "./NavBarHeading";
import { SidebarRailMenu } from "../sidebar-menu/rail/SidebarRailMenu";
import { SidebarItem } from "../sidebar-menu/rail/renderer/types";
import {
  renderItemsExpanded,
  renderItemsInRail,
} from "../sidebar-menu/rail/renderer/RailRenderer";
import { NavBarSideMenuButton } from "./NavBarSideMenuButton";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { TextInput } from "@stenajs-webui/forms";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons/faThumbtack";

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
  const onClick = () => {};

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} width={"250px"}>
        <Column width={"100%"}>
          <SidebarMenu onCloseClick={close} variant={variant}>
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
      >
        <NavBarButton label={"Customers"} leftIcon={faUsers} selected />
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

export const CenterContent = () => (
  <NavBar center={<TextInput />}>
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

const sidebarItems: SidebarItem[] = [
  { type: "heading", label: "Product name" },
  { type: "link", label: "Level 1.1", leftIcon: faUserFriends },
  { type: "link", label: "No icon" },
  { type: "link", label: "Spinner", loading: true },
  { type: "link", label: "Selected", selected: true },
  {
    type: "grouped",
    label: "Level 1.2",
    leftIcon: faChartBar,
    items: [
      { type: "link", label: "Level 2.1" },
      { type: "link", label: "Level 2.2" },
      { type: "link", label: "Level 2.3" },
      { type: "link", label: "Level 2.4" },
    ],
  },
  { type: "separator" },
  { type: "heading", label: "Support" },
  { type: "link", label: "User manual", leftIcon: faBook },
  { type: "link", label: "Contact", leftIcon: faPaperPlane },
];

export const DemoWithRail: Story = () => {
  const [isOpen, open, close] = useBoolean(false);
  const [railEnabled, enableRail, disableRail] = useBoolean(true);

  const drawerWidth = "250px";

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onRequestClose={close}
        width={drawerWidth}
        background={"var(--lhds-color-blue-500)"}
      >
        <Column width={"100%"}>
          <SidebarMenu onCloseClick={close}>
            {renderItemsExpanded(sidebarItems)}
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
            <SidebarMenuLink
              style={{ marginTop: "auto" }}
              leftIcon={railEnabled ? faAngleDoubleLeft : faThumbtack}
              label={railEnabled ? "Unpin menu" : "Pin menu"}
              onClick={() => {
                if (railEnabled) {
                  disableRail();
                } else {
                  enableRail();
                }
                close();
              }}
            />
          </SidebarMenu>
        </Column>
      </Drawer>
      <NavBar
        showMenuButton
        onClickMenuButton={open}
        menuButtonVisibility={railEnabled ? "hidden" : "visible"}
        left={<NavBarHeading>Stena line</NavBarHeading>}
      />
      {railEnabled && (
        <SidebarRailMenu>
          <NavBarSideMenuButton onClick={open} />
          {renderItemsInRail(sidebarItems, { popupMinWidth: drawerWidth })}
          <SidebarMenuLink
            style={{ marginTop: "auto" }}
            title={"Unpin menu"}
            leftIcon={faAngleDoubleLeft}
            onClick={disableRail}
          />
        </SidebarRailMenu>
      )}
    </>
  );
};
