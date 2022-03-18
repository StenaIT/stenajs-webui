import { Column, Text } from "@stenajs-webui/core";
import { TableRow } from "../components/table/TableRow";
import * as React from "react";
import { TableHeadRow } from "../components/table/TableHeadRow";
import { TableHeadItem } from "../components/table/TableHeadItem";
import { TableCell } from "../components/table/TableCell";
import { cssColor } from "@stenajs-webui/theme";
import { ActionMenuItem } from "@stenajs-webui/elements";

export default {
  title: "grid/TableUi",
};

const borderLeft = "1px solid " + cssColor("--lhds-color-ui-300");
const width = "200px";

export const Overview = () => {
  const noop = () => {};
  return (
    <Column>
      <TableHeadRow>
        <TableHeadItem
          label={"Username"}
          width={width}
          arrow={"down"}
          onClick={noop}
          popoverContent={
            <Column>
              <ActionMenuItem label={"Rename"} />
              <ActionMenuItem label={"Ban"} />
              <ActionMenuItem label={"Delete"} />
            </Column>
          }
          infoIconTooltipText={"This is the username."}
        />
        <TableHeadItem
          label={"E-mail"}
          width={width}
          infoIconTooltipText={"This is the e-mail."}
          onClick={noop}
          arrow={"down"}
        />
        <TableHeadItem
          label={"First name"}
          width={width}
          borderLeft={borderLeft}
          loading
          onClick={noop}
          arrow={"up"}
        />
        <TableHeadItem
          label={"Last name"}
          width={width}
          onClick={noop}
          infoIconTooltipText={"This is the username."}
        />
        <TableHeadItem label={""} width={width} borderLeft={borderLeft} />
      </TableHeadRow>
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <TableRow key={i}>
            <TableCell width={width}>
              <Text>majo</Text>
            </TableCell>
            <TableCell width={width}>
              <Text>majo@majo.se</Text>
            </TableCell>
            <TableCell width={width} borderLeft={borderLeft}>
              <Text>Majon</Text>
            </TableCell>
            <TableCell width={width}>
              <Text>Naise</Text>
            </TableCell>
            <TableCell width={width} borderLeft={borderLeft} />
          </TableRow>
        ))}
    </Column>
  );
};

interface Friend {
  name: string;
  gender: "male" | "female" | "something else";
  comment?: string;
}

export const WithBorderTopHidden = () => {
  const friends: Array<Friend> = [
    { name: "Hans", gender: "male" },
    { name: "Adam", gender: "male", comment: "My bro!" },
    { name: "Jens", gender: "male" },
    { name: "Lis-Jürgen", gender: "something else" },
    { name: "Gregory", gender: "something else", comment: "Mom" },
    { name: "Gunilla", gender: "female" },
    { name: "Jane", gender: "female" },
  ];

  const FriendRow: React.VFC<{ friend: Friend; hideBorder: boolean }> = ({
    friend,
    hideBorder,
  }) => {
    return (
      <TableRow hideBorderTop={hideBorder}>
        <TableCell width={width}>
          <Text>{friend.name}</Text>
        </TableCell>
        <TableCell width={width}>
          <Text>{friend.gender}</Text>
        </TableCell>
        <TableCell borderLeft={borderLeft} width={width}>
          <Text>{friend.comment}</Text>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Column>
      <TableHeadRow>
        <TableHeadItem label={"Name"} width={width} />
        <TableHeadItem label={"Gender"} width={width} />
        <TableHeadItem
          label={"Comment"}
          borderLeft={borderLeft}
          width={width}
        />
      </TableHeadRow>
      {friends.map((friend, index) => {
        const hideBorder =
          index > 0 && friends[index - 1].gender === friend.gender;
        return <FriendRow friend={friend} hideBorder={hideBorder} />;
      })}
    </Column>
  );
};
