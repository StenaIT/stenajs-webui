import * as React from "react";
import { useState } from "react";
import {
  FlatButton,
  Link,
  PrimaryButton,
  SecondaryButton,
  stenaBell,
  stenaCalendarManage,
  stenaCheck,
  stenaCheckCircle,
  stenaExclamationTriangle,
  stenaInfoCircle,
  stenaInfoMegaphone,
  stenaMinus,
  stenaPlugin,
  stenaQuestionBubble,
  stenaSms,
  Tab,
  TabMenu,
  Tag,
} from "@stenajs-webui/elements";
import {
  Box,
  Column,
  Row,
  Space,
  Text,
  Txt,
  useBoolean,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { Notification, NotificationProps } from "./Notification";

import {
  colorListControl,
  hideControl,
  textControl,
} from "../../storybook-helpers/storybook-controls";
import { formatDistance, subMinutes } from "date-fns";
import { NavBar } from "../nav-bar/NavBar";
import { NavBarNotificationButton } from "../nav-bar/NavBarNotificationButton";
import { Drawer, DrawerHeader } from "@stenajs-webui/modal";
import { NavBarHeading } from "../nav-bar/NavBarHeading";
import { NotificationList } from "./NotificationList";
import { Story } from "@storybook/react";

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
    onClose: hideControl,
  },
};

export const Demo = () => {
  const [isOpen, , close, toggle] = useBoolean(true);
  const [tab, setTab] = useState(0);

  return (
    <>
      <NavBar
        right={
          <NavBarNotificationButton count={3} unread={true} onClick={toggle} />
        }
        left={<NavBarHeading>Stena Line</NavBarHeading>}
        showMenuButton={true}
      />
      <Drawer isOpen={isOpen} onRequestClose={close} slideFrom={"right"}>
        <DrawerHeader
          header={"Notifications"}
          icon={stenaBell}
          onRequestClose={close}
        />
        <TabMenu>
          <Tab
            label={"Bookings (24)"}
            selected={tab === 0}
            onClick={() => setTab(0)}
          />
          <Tab
            label={"Urgent message (12)"}
            selected={tab === 1}
            onClick={() => setTab(1)}
          />
        </TabMenu>
        <NotificationList>
          <Notification
            text={"Liverpool (Birkenhead) / Belfast service - Shared cabins"}
            timestamp={`${formatDistance(
              new Date(),
              subMinutes(new Date(), 3),
            )} ago`}
            unread
            icon={stenaQuestionBubble}
            iconAriaLabel={"Information"}
          >
            <Text>Please be informed that on the 6th January CST open..</Text>
            <Row justifyContent={"flex-end"}>
              <FlatButton label={"Read more"} />
            </Row>
          </Notification>
          <Notification
            text={"Plug-ins"}
            timestamp={`${formatDistance(
              new Date(),
              subMinutes(new Date(), 12),
            )} ago`}
            unread
            icon={stenaPlugin}
            iconAriaLabel={"Information"}
          >
            <Column gap={2}>
              <Text>Do you want to add plugins to your booking?</Text>
              <Row gap={2}>
                <PrimaryButton label={"Yes"} />
                <SecondaryButton label={"No"} />
              </Row>
            </Column>
          </Notification>
          <Notification
            text={"1 booking confirmed"}
            timestamp={`${formatDistance(
              new Date(),
              subMinutes(new Date(), 18),
            )} ago`}
            icon={stenaCheckCircle}
            iconAriaLabel={"Information"}
            onClose={() => {}}
          >
            <Column gap={2}>
              <Link>GOFR 2022-09-06</Link>
              <Link>45678976</Link>
            </Column>
          </Notification>
          <Notification
            text={"Booking 87654654 cancelled"}
            timestamp={`${formatDistance(
              new Date(),
              subMinutes(new Date(), 18),
            )} ago`}
            icon={stenaMinus}
            iconAriaLabel={"Information"}
            onClose={() => {}}
          >
            <Column gap={2}>
              <Link>GOFR 2022-09-06</Link>
              <Link>45678976</Link>
            </Column>
          </Notification>
          <Notification
            unread
            variant={"danger"}
            text={"1 booking not added"}
            timestamp={`${formatDistance(
              new Date(),
              subMinutes(new Date(), 8),
            )} ago`}
            icon={stenaExclamationTriangle}
            iconAriaLabel={"Information"}
            onClose={() => {}}
          >
            <Text>
              There was a problem. Please review your information and try again.
            </Text>
          </Notification>
        </NotificationList>
      </Drawer>
    </>
  );
};

export const Overview: Story<NotificationProps> = (props) => (
  <Box width={300}>
    <Notification {...props} />
  </Box>
);
Overview.args = {
  text: "1 booking confirmed",
  icon: stenaCheck,
  timestamp: `${formatDistance(new Date(), new Date())} ago`,
  children: (
    <Column alignItems={"flex-start"}>
      <Link variant={"bold"}>76123456</Link>
      <Space />
      <Txt size={"small"}>Customer reference required</Txt>
      <Space num={2} />
      <Link variant={"bold"}>GOFR 2023-01-20 09:00</Link>
    </Column>
  ),
  onClose: () => {},
};

export const Minimal = () => (
  <Box width={300}>
    <Notification text={"You need at least some text"} />
  </Box>
);

export const Icon = () => (
  <Box width={300}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const IconWithCustomBackgroundColor = () => (
  <Box width={300} gap>
    <Notification
      text={"Success"}
      icon={stenaCheck}
      iconAriaLabel={"Success"}
      iconBackgroundColor={"--lhds-color-green-100"}
    />
    <Notification
      text={"Information"}
      icon={stenaInfoCircle}
      iconAriaLabel={"Information"}
      iconBackgroundColor={"--lhds-color-blue-100"}
    />
    <Notification
      text={"Warning"}
      icon={stenaExclamationTriangle}
      iconAriaLabel={"Warning"}
      iconBackgroundColor={"--lhds-color-orange-100"}
    />
    <Notification
      text={"Error"}
      icon={stenaExclamationTriangle}
      iconAriaLabel={"Error"}
      iconBackgroundColor={"--lhds-color-red-100"}
    />
    <Notification
      text={"Unread Error"}
      icon={stenaExclamationTriangle}
      iconAriaLabel={"Error"}
      iconBackgroundColor={"--lhds-color-red-100"}
      unread={true}
    />
  </Box>
);

export const LongText = () => (
  <Box width={300}>
    <Notification
      text={
        "Try to keep the text short but if it should need several rows it wraps like this"
      }
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const Timestamp = () => (
  <Box width={300}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
      timestamp={`${formatDistance(new Date(), new Date())} ago`}
    />
  </Box>
);

export const LeftContent = () => (
  <Box width={300}>
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

export const RightContent = () => (
  <Box width={300}>
    <Notification
      text={"24 nov 06:10"}
      icon={stenaCalendarManage}
      iconAriaLabel={"Date"}
      contentRight={<Tag label={"Confirmed"} variant={"success"} />}
    />
  </Box>
);

export const Content = () => (
  <Box width={300}>
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

export const CloseFunction = () => {
  const [showNotification, setShowNotification] = useState(true);

  const onClose = () => {
    setShowNotification(false);
    setTimeout(() => setShowNotification(true), 1000);
  };

  return (
    showNotification && (
      <Box width={300}>
        <Notification
          text={"Temporary timetable changes"}
          timestamp={`${formatDistance(new Date(), new Date())} ago`}
          icon={stenaInfoCircle}
          iconAriaLabel={"Information"}
          onClose={onClose}
        >
          <Box gap={2} alignItems={"flex-start"}>
            <Txt>
              Please be advised that there is essential maintenance work being
              performed on...
            </Txt>
            <Row alignSelf={"flex-end"}>
              <FlatButton label={"Full message"} leftIcon={stenaSms} />
            </Row>
          </Box>
        </Notification>
      </Box>
    )
  );
};
