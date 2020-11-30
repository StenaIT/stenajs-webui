import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import {
  faBook,
  faChartBar,
  faPaperPlane,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@stenajs-webui/elements";
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
          <SidebarMenuLink indent label={"Total"} onClick={onClick} />
          <SidebarMenuLink indent label={"Sales region"} onClick={onClick} />
          <SidebarMenuLink indent label={"Routes"} onClick={onClick} selected />
          <SidebarMenuLink indent label={"Sellers"} onClick={onClick} />
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
