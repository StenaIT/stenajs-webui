import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuCollapsible,
  SidebarMenuCollapsibleLink,
  SidebarMenuHeading,
  SidebarMenuLink,
} from "@stenajs-webui/panels";
import {
  faBook,
  faChartBar,
  faPaperPlane,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@stenajs-webui/elements";

export default {
  title: "panels/SidebarMenu",
};

export const Overview = () => {
  return (
    <Column
      width={300}
      height={800}
      justifyContent={"space-between"}
      background={"var(--lhds-color-blue-900)"}
    >
      <SidebarMenu onCloseClick={() => alert("Close menu")}>
        <SidebarMenuHeading label={"Freight Pricing Portal"} />
        <SidebarMenuLink
          selected
          onClick={() => alert("Clicked Customers")}
          iconLeft={faUserFriends}
          label={"Customers"}
        />
        <SidebarMenuCollapsible label={"Statistics"} iconLeft={faChartBar}>
          <SidebarMenuCollapsibleLink label={"Total"} />
          <SidebarMenuCollapsibleLink label={"Sales region"} />
          <SidebarMenuCollapsibleLink label={"Routes"} selected />
          <SidebarMenuCollapsibleLink label={"Sellers"} />
        </SidebarMenuCollapsible>

        <SidebarMenuHeading label={"Support"} />
        <SidebarMenuLink
          iconLeft={faBook}
          label={"Quick guide"}
          onClick={() => alert("Click on quick guide")}
        />
        <SidebarMenuLink
          iconLeft={faPaperPlane}
          label={"Contact Team WebUI"}
          onClick={() => alert("Click on contact")}
        />
      </SidebarMenu>

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
    </Column>
  );
};

export const WithoutIcons = () => {
  return (
    <Column
      width={300}
      height={800}
      justifyContent={"space-between"}
      background={"var(--lhds-color-blue-900)"}
    >
      <SidebarMenu onCloseClick={() => alert("Close menu")}>
        <SidebarMenuHeading label={"Freight Pricing Portal"} />
        <SidebarMenuLink
          selected
          onClick={() => alert("Clicked Customers")}
          label={"Customers"}
        />
        <SidebarMenuCollapsible label={"Statistics"}>
          <SidebarMenuCollapsibleLink label={"Total"} />
          <SidebarMenuCollapsibleLink label={"Sales region"} />
          <SidebarMenuCollapsibleLink selected label={"Routes"} />
          <SidebarMenuCollapsibleLink label={"Sellers"} />
        </SidebarMenuCollapsible>

        <SidebarMenuHeading label={"Support"} />
        <SidebarMenuLink
          label={"Quick guide"}
          onClick={() => alert("Click on quick guide")}
        />
        <SidebarMenuLink
          label={"Contact Team WebUI"}
          onClick={() => alert("Click on contact")}
        />
      </SidebarMenu>

      <Box>
        <Box spacing={8}>
          <Icon color={"var(--swui-white)"} size={50} data-hover={true} />
        </Box>
      </Box>
    </Column>
  );
};
