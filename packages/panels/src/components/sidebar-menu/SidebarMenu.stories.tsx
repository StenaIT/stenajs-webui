import { Box, Column } from "@stenajs-webui/core";
import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuContainer,
  SidebarCloseButton,
} from "@stenajs-webui/panels";
import {
  SidebarMenuHeading,
  SidebarMenuLink,
  SidebarMenuCollapsible,
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
      <SidebarMenuContainer onCloseClick={() => alert("Close menu")}>
        <SidebarMenu>
          <SidebarMenuHeading>Freight Pricing Portal</SidebarMenuHeading>
          <SidebarMenuLink
            selected
            onClick={() => alert("Clicked Customers")}
            iconLeft={faUserFriends}
          >
            Customers
          </SidebarMenuLink>
          <SidebarMenuCollapsible label={"Statistics"} iconLeft={faChartBar}>
            <SidebarMenuLink>Total</SidebarMenuLink>
            <SidebarMenuLink>Sales region</SidebarMenuLink>
            <SidebarMenuLink selected>Routes</SidebarMenuLink>
            <SidebarMenuLink>Sellers</SidebarMenuLink>
          </SidebarMenuCollapsible>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuHeading>Support</SidebarMenuHeading>
          <SidebarMenuLink iconLeft={faBook}>Quick guide</SidebarMenuLink>
          <SidebarMenuLink iconLeft={faPaperPlane}>
            Contact Team WebUI
          </SidebarMenuLink>
        </SidebarMenu>
      </SidebarMenuContainer>
      <Box>
        <Box spacing={8}>
          <Icon
            icon={faPaperPlane}
            color={"var(--swui-white)"}
            size={50}
            data-hover={true}
          />
        </Box>
        <SidebarCloseButton onClick={() => alert("Close menu")} />
      </Box>
    </Column>
  );
};
