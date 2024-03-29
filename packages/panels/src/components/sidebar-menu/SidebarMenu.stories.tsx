import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import {
  Icon,
  stenaBusinessClaim,
  stenaBusinessInvoice,
  stenaCalendar,
  stenaClock,
  stenaHelp,
  stenaSailingTicket,
  stenaSlidersMini,
  stenaStatisticsBar,
  stenaStatisticsLine,
  stenaStatusNoShow,
} from "@stenajs-webui/elements";
import { SidebarMenuHeading } from "./items/SidebarMenuHeading";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuLink } from "./items/SidebarMenuLink";
import { SidebarMenuCollapsible } from "./items/SidebarMenuCollapsible";
import { SidebarMenuSeparator } from "./items/SidebarMenuSeparator";
import { SidebarRailMenu } from "./rail/SidebarRailMenu";

export default {
  title: "panels/SidebarMenu",
  component: SidebarMenu,
  subcomponents: {
    SidebarMenu,
    SidebarMenuLink,
    SidebarMenuCollapsible,
    SidebarMenuSeparator,
  },
};

const createSidebarMenuItems = (onClick: () => void) => (
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
    <SidebarMenuCollapsible label={"Invoices"} leftIcon={stenaBusinessInvoice}>
      <SidebarMenuLink label={"No show & late handling"} onClick={onClick} />
      <SidebarMenuLink label={"Late payment"} onClick={onClick} />
      <SidebarMenuLink
        label={"Archive (selected)"}
        onClick={onClick}
        selected
      />
      <SidebarMenuLink label={"Level 2.4"} onClick={onClick} />
      <SidebarMenuCollapsible label={"Level 2.5"} leftIcon={stenaStatisticsBar}>
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

export const Overview = () => {
  const onClick = () => alert("Click");

  return (
    <Column width={"250px"}>
      <SidebarMenu onCloseClick={() => alert("Close menu")}>
        <SidebarMenuHeading label={"Freight portal"} />
        <SidebarMenuLink
          onClick={() => alert("Clicked Customers")}
          leftIcon={stenaCalendar}
          label={"Manage"}
        />
        <SidebarMenuLink
          onClick={() => alert("Clicked Customers")}
          label={"Book (selected)"}
          leftIcon={stenaSailingTicket}
          selected
        />
        <SidebarMenuLink
          onClick={() => alert("Clicked Customers")}
          label={"Statistics"}
          leftIcon={stenaStatisticsLine}
        />
        <SidebarMenuHeading label={"Administration"} />
        <SidebarMenuCollapsible
          label={"Invoices"}
          leftIcon={stenaBusinessInvoice}
        >
          <SidebarMenuLink
            label={"No show & late handling"}
            onClick={onClick}
          />
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
          onClick={() => alert("Click on quick guide")}
        />
        <SidebarMenuLink
          leftIcon={stenaStatusNoShow}
          label={"No show, late handling"}
          onClick={() => alert("Click on contact")}
        />
      </SidebarMenu>
    </Column>
  );
};

export const RailMenu = () => {
  return (
    <SidebarRailMenu
      onClickMenuButton={() => alert("Open sidebar menu")}
      closeButtonVisible
      onClickCloseButton={() => alert("Unpin it")}
      bottomItems={bottomItems}
    >
      {createSidebarMenuItems(() => alert("Clicked a link"))}
    </SidebarRailMenu>
  );
};
export const WithoutIcons = () => {
  const onClick = () => alert("Click");
  return (
    <Column width={300} height={800} justifyContent={"space-between"}>
      <SidebarMenu onCloseClick={() => alert("Close menu")}>
        <SidebarMenuHeading label={"Freight Pricing Portal"} />
        <SidebarMenuLink
          selected
          onClick={() => alert("Clicked Customers")}
          label={"Customers"}
        />
        <SidebarMenuCollapsible label={"Statistics"}>
          <SidebarMenuLink label={"Total"} onClick={onClick} />
          <SidebarMenuLink label={"Sales region"} onClick={onClick} />
          <SidebarMenuLink label={"Routes"} onClick={onClick} selected />
          <SidebarMenuLink label={"Sellers"} onClick={onClick} />
        </SidebarMenuCollapsible>

        <SidebarMenuSeparator />

        <SidebarMenuHeading label={"Support"} />
        <SidebarMenuLink
          label={"Quick guide"}
          onClick={() => alert("Click on quick guide")}
        />
        <SidebarMenuLink
          label={"Contact Team WebUI"}
          onClick={() => alert("Click on contact")}
        />
        <Box>
          <Box spacing={8}>
            <Icon color={"var(--swui-white)"} size={50} data-hover={true} />
          </Box>
        </Box>
      </SidebarMenu>
    </Column>
  );
};
