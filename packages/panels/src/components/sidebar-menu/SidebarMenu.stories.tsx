import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuCollapsible,
  SidebarMenuHeading,
  SidebarMenuLink,
  SidebarMenuSeparator,
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
  const noop = () => {};

  return (
    <Column width={"250px"}>
      <SidebarMenu onCloseClick={() => alert("Close menu")}>
        <SidebarMenuHeading label={"Product name"} />
        <SidebarMenuLink
          onClick={noop}
          leftIcon={faUserFriends}
          label={"Level 1.1"}
        />
        <SidebarMenuLink onClick={noop} label={"No icon"} />
        <SidebarMenuLink onClick={noop} loading label={"Spinner"} />
        <SidebarMenuLink onClick={noop} selected label={"Selected"} />
        <SidebarMenuCollapsible label={"Level 1.2"} leftIcon={faChartBar}>
          <SidebarMenuLink indent label={"Level 2.1"} onClick={noop} />
          <SidebarMenuLink indent label={"Level 2.2"} onClick={noop} />
          <SidebarMenuLink indent label={"Level 2.3"} onClick={noop} selected />
          <SidebarMenuLink indent label={"Level 2.4"} onClick={noop} />
        </SidebarMenuCollapsible>

        <SidebarMenuSeparator />

        <SidebarMenuHeading label={"Support"} />
        <SidebarMenuLink
          leftIcon={faBook}
          label={"User manual"}
          onClick={noop}
        />
        <SidebarMenuLink
          leftIcon={faPaperPlane}
          label={"Contact"}
          onClick={noop}
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
  );
};

export const WithoutIcons = () => {
  const noop = () => {};
  return (
    <Column width={300} height={800} justifyContent={"space-between"}>
      <SidebarMenu onCloseClick={noop}>
        <SidebarMenuHeading label={"Freight Pricing Portal"} />
        <SidebarMenuLink selected onClick={noop} label={"Customers"} />
        <SidebarMenuCollapsible label={"Statistics"}>
          <SidebarMenuLink indent label={"Total"} onClick={noop} />
          <SidebarMenuLink indent label={"Sales region"} onClick={noop} />
          <SidebarMenuLink indent label={"Routes"} onClick={noop} selected />
          <SidebarMenuLink indent label={"Sellers"} onClick={noop} />
        </SidebarMenuCollapsible>

        <SidebarMenuSeparator />

        <SidebarMenuHeading label={"Support"} />
        <SidebarMenuLink label={"Quick guide"} onClick={noop} />
        <SidebarMenuLink label={"Contact Team WebUI"} onClick={noop} />
        <Box>
          <Box spacing={8}>
            <Icon color={"var(--swui-white)"} size={50} data-hover={true} />
          </Box>
        </Box>
      </SidebarMenu>
    </Column>
  );
};
