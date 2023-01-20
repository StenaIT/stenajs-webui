import * as React from "react";
import {
  FlatButton,
  Link,
  stenaCalendarManage,
  stenaCheck,
  stenaInfoMegaphone,
  stenaSms,
  Tag,
} from "@stenajs-webui/elements";
import { Box, Column, Row, Space, Txt } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { Notification, NotificationProps } from "./Notification";
import { Story } from "@storybook/react";
import {
  colorListControl,
  hideControl,
  textControl,
} from "../../storybook-helpers/storybook-controls";
import { formatDistance } from "date-fns";

export default {
  title: "panels/Notifications/Notification",
  component: Notification,
  parameters: {
    backgrounds: {
      default: "grey",
    },
  },
  argTypes: {
    text: textControl,
    timestamp: textControl,
    icon: hideControl,
    iconColor: colorListControl,
    iconAriaLabel: textControl,
    background: colorListControl,
    contentLeft: hideControl,
    contentRight: hideControl,
    children: hideControl,
  },
};

export const Overview: Story<NotificationProps> = (props) => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification {...props} />
  </Box>
);
Overview.args = {
  text: "1 booking confirmed",
  icon: stenaCheck,
  iconColor: cssColor("--lhds-color-green-600"),
  timestamp: `${formatDistance(new Date(), new Date())} ago`,
  children: (
    <Column alignItems={"flex-start"}>
      <Link variant={"bold"}>76123456</Link>
      <Space />
      <Txt size={"small"}>
        A UK Customs Procedure must be set prior to check-in. Enter the required
        Import data after the customs procedure is set.
      </Txt>
      <Space num={2} />
      <Link variant={"bold"}>HKHA 2023-01-20 14:15</Link>
    </Column>
  ),
};

export const Minimal = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification text={"You need at least some text"} />
  </Box>
);

export const Icon = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const IconColour = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
      iconColor={cssColor("--lhds-color-blue-500")}
    />
  </Box>
);

export const LongText = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={
        "This text is long and spans multiple rows and this is what that looks like"
      }
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const LeftContent = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Custom content"}
      contentLeft={
        <Box
          background={cssColor("--lhds-color-red-500")}
          height={20}
          width={20}
        />
      }
    />
  </Box>
);

export const Content = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"More content"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    >
      <Column gap={2} alignItems={"flex-start"}>
        <Txt>This thing just happened</Txt>
        <Link variant={"bold"} size={"small"}>
          Read all about it
        </Link>
      </Column>
    </Notification>
  </Box>
);

export const InPanelNotification = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"24 nov 06:10"}
      icon={stenaCalendarManage}
      iconAriaLabel={"Date"}
      contentRight={<Tag label={"Confirmed"} variant={"success"} />}
    >
      <Box gap={2} alignItems={"flex-start"}>
        <Txt>1 booking confirmed</Txt>
        <Link variant={"bold"} size={"small"}>
          GOFR 2022-09-06
        </Link>
        <Txt>More information required</Txt>
        <Row alignSelf={"flex-end"}>
          <FlatButton label={"Full message"} leftIcon={stenaSms} />
        </Row>
      </Box>
    </Notification>
  </Box>
);
