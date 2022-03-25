import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import {
  Box,
  Column,
  exhaustSwitchCaseElseThrow,
  Heading,
  Row,
  Space,
  Text,
  useBoolean,
} from "@stenajs-webui/core";
import { FlatButton, Icon, WithBadge } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { NavBar, NavBarProps } from "./NavBar";
import { NavBarButton } from "./NavBarButton";
import { NavBarPopoverButton } from "./NavBarPopoverButton";
import { cssColor } from "@stenajs-webui/theme";
import { Drawer } from "@stenajs-webui/modal";
import { SidebarMenu } from "../sidebar-menu/SidebarMenu";
import { SidebarMenuHeading } from "../sidebar-menu/SidebarMenuHeading";
import {
  SidebarMenuLink,
  SidebarMenuLinkProps,
} from "../sidebar-menu/SidebarMenuLink";
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
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { Popover } from "@stenajs-webui/tooltip";
import { NavBarSideMenuButton } from "./NavBarSideMenuButton";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";

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
  const onClick = () => {};

  return (
    <div>
      <Drawer isOpen={isOpen} onRequestClose={close} width={"250px"}>
        <Column width={"100%"}>
          <SidebarMenu onCloseClick={close} variant={"dark"}>
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

interface SidebarHeadingItem {
  type: "heading";
  label: string;
}

interface SidebarSeparatorItem {
  type: "separator";
}

interface SidebarLinkItem extends Omit<SidebarMenuLinkProps, "type"> {
  type: "link";
}

interface SidebarGroupedItem {
  type: "grouped";
  label: string;
  leftIcon?: IconDefinition;
  items: SidebarItem[];
}

type SidebarItem =
  | SidebarHeadingItem
  | SidebarSeparatorItem
  | SidebarLinkItem
  | SidebarGroupedItem;

const renderItemsExpanded = (
  items: SidebarItem[],
  indent = false
): ReactNode[] => {
  return items.map((item) => {
    switch (item.type) {
      case "heading":
        return <SidebarMenuHeading label={item.label} />;
      case "separator":
        return <SidebarMenuSeparator />;
      case "link": {
        const { type, ...linkProps } = item;
        return <SidebarMenuLink indent={indent} {...linkProps} />;
      }
      case "grouped":
        return (
          <SidebarMenuCollapsible leftIcon={item.leftIcon} label={item.label}>
            {renderItemsExpanded(item.items, true)}
          </SidebarMenuCollapsible>
        );
      default:
        return exhaustSwitchCaseElseThrow(item);
    }
  });
};

const renderItemsInRail = (items: SidebarItem[]): ReactNode[] => {
  return items.map((item) => {
    switch (item.type) {
      case "heading":
        return null;
      case "separator":
        return <SidebarMenuSeparator />;
      case "link": {
        const { type, ...linkProps } = item;
        return (
          <SidebarMenuLink
            title={item.label}
            width={"var(--swui-sidebar-menu-item-height)"}
            {...linkProps}
            label={undefined}
          />
        );
      }
      case "grouped":
        return (
          <div>
            <Popover
              appendTo={"parent"}
              arrow={false}
              offset={[0, 0]}
              placement={"right-start"}
              trigger={"focusin mouseenter click"}
              disablePadding
              lazy
              content={
                <Box minWidth={"250px"}>{renderItemsExpanded(item.items)}</Box>
              }
            >
              <SidebarMenuLink
                width={"var(--swui-sidebar-menu-item-height)"}
                leftIcon={item.leftIcon}
              />
            </Popover>
          </div>
        );
      default:
        return exhaustSwitchCaseElseThrow(item);
    }
  });
};

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

export const DemoWithRail: Story<Pick<NavBarProps, "variant">> = ({
  variant,
}) => {
  const [isOpen, open, close] = useBoolean(false);
  const [railEnabled, enableRail, disableRail] = useBoolean(true);

  return (
    <>
      <Drawer isOpen={isOpen} onRequestClose={close} width={"250px"}>
        <Column width={"100%"}>
          <SidebarMenu onCloseClick={close} variant={variant}>
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
              leftIcon={faAngleDoubleRight}
              label={"Always show menu"}
              onClick={() => {
                enableRail();
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
        variant={variant}
        left={<NavBarHeading>Stena line</NavBarHeading>}
      />
      {railEnabled && (
        <SidebarMenu
          collapsed
          position={"fixed"}
          left={0}
          top={0}
          hideCloseButton
        >
          <NavBarSideMenuButton variant={variant} onClick={open} />
          {renderItemsInRail(sidebarItems)}
          <SidebarMenuLink
            style={{ marginTop: "auto" }}
            leftIcon={faAngleDoubleLeft}
            onClick={disableRail}
          />
        </SidebarMenu>
      )}
    </>
  );
};
