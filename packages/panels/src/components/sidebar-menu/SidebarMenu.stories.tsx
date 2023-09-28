import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import {
  Icon,
  stenaBusinessClaim,
  stenaBusinessInvoice,
  stenaCalendar,
  stenaSailingTicket,
  stenaStatisticsLine,
  stenaStatusNoShow,
} from "@stenajs-webui/elements";
import { SidebarMenuHeading } from "./SidebarMenuHeading";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuLink } from "./SidebarMenuLink";
import { SidebarMenuCollapsible } from "./SidebarMenuCollapsible";
import { SidebarMenuSeparator } from "./SidebarMenuSeparator";

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
          <SidebarMenuCollapsible label={"Level 2.5"} leftIcon={faChartBar}>
            <SidebarMenuLink label={"Level 3.1"} onClick={onClick} />
            <SidebarMenuLink label={"Level 3.2"} onClick={onClick} />
            <SidebarMenuCollapsible label={"Level 3.3"} leftIcon={faChartBar}>
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
