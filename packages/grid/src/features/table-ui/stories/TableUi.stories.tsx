import { Column, Text } from "@stenajs-webui/core";
import { TableRow } from "../components/table/TableRow";
import * as React from "react";
import { useState } from "react";

import { TableHeadRow } from "../components/table/TableHeadRow";
import { TableHeadItem } from "../components/table/TableHeadItem";
import { TableCell } from "../components/table/TableCell";
import { cssColor } from "@stenajs-webui/theme";
import { ActionMenu, ActionMenuItem } from "@stenajs-webui/elements";

export default {
  title: "grid/TableUi",
};

const borderLeft = "1px solid " + cssColor("--lhds-color-ui-300");
const width = "225px";

export const Overview = () => {
  const [selectedNr, setSelectedNr] = useState(1);

  const onClickActive = (nr: number) => {
    setSelectedNr(nr);
  };
  return (
    <Column>
      <TableHeadRow>
        <TableHeadItem
          label={"Username"}
          width={width}
          onClick={() => {
            onClickActive(1);
          }}
          selected={selectedNr === 1}
          arrow={(selectedNr === 1 && "down") || undefined}
          popoverContent={
            <ActionMenu>
              <ActionMenuItem label={"Rename"} />
              <ActionMenuItem label={"Ban"} />
              <ActionMenuItem label={"Delete"} />
            </ActionMenu>
          }
          infoIconTooltipText={"This is the username."}
        />
        <TableHeadItem
          label={"E-mail"}
          width={width}
          infoIconTooltipText={"This is the e-mail."}
          onClick={() => {
            onClickActive(2);
          }}
          selected={selectedNr === 2}
          arrow={(selectedNr === 2 && "down") || undefined}
        />
        <TableHeadItem
          label={"First name"}
          width={width}
          borderLeft={borderLeft}
          loading
          onClick={() => {
            onClickActive(3);
          }}
          selected={selectedNr === 3}
          arrow={(selectedNr === 3 && "down") || undefined}
        />
        <TableHeadItem
          label={"Last name"}
          width={width}
          onClick={() => {
            onClickActive(4);
          }}
          selected={selectedNr === 4}
          arrow={(selectedNr === 4 && "down") || undefined}
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
        return (
          <FriendRow
            key={friend.name}
            friend={friend}
            hideBorder={hideBorder}
          />
        );
      })}
    </Column>
  );
};
