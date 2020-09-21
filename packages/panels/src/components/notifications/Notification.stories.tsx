import { Column } from "@stenajs-webui/core";
import { Notification } from "@stenajs-webui/panels";
import * as React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { SeparatorLine } from "@stenajs-webui/core";
import { subHours } from "date-fns";

export default {
  title: "panels/Notification",
};

export const Standard = () => (
  <Column
    width={"350px"}
    borderStyle={"solid"}
    borderWidth={1}
    borderColor={"separator"}
  >
    <Notification
      title={"You have a friend request"}
      text={"Robert wants to be your friend."}
      dismissed
      date={new Date()}
    />
    <SeparatorLine />
    <Notification
      title={"You have a friend request"}
      text={"Markus wants to be your friend."}
      date={subHours(new Date(), 5)}
    />
    <SeparatorLine />
    <Notification
      title={"You have a friend request"}
      text={"Everyone wants to be your friend."}
      icon={faUser}
      date={subHours(new Date(), 48)}
    />
  </Column>
);

Standard.storyName = "standard";
