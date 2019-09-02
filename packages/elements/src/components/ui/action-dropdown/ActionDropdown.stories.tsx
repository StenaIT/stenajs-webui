import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { TinyText } from "@stenajs-webui/core";
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator
} from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import markdown from "./ActionDropdown.md";

const hello = () => {
  console.log("hello");
};

storiesOf("elements/ActionDropdown", module)
  .add(
    "standard",
    () => (
      <ActionDropdown>
        <ActionDropdownItem label={"Open"} onClick={hello} />
        <ActionDropdownItem label={"Save"} icon={faSave} onClick={hello} />
        <ActionDropdownItem
          label={"Put on fire"}
          icon={faFire}
          onClick={hello}
          disabled
        />
        <ActionDropdownItem
          label={"Click doesn't close"}
          onClick={hello}
          disableCloseOnClick
        />
        <ActionDropdownItem label={"Disabled"} disabled onClick={hello} />
        <ActionDropdownItem
          label={"Icon right"}
          onClick={hello}
          iconRight={faCheck}
        />
        <ActionDropdownItem
          label={"Icon right disabled"}
          onClick={hello}
          iconRight={faCheck}
          disabled
        />
        <ActionDropdownItem label={"Custom right"}>
          <TinyText color={"tomato"}>So custom!</TinyText>
        </ActionDropdownItem>
        <ActionDropdownSeparator />
        <ActionDropdownItem
          label={"Quit"}
          rightText={"cmd+q"}
          onClick={hello}
        />
      </ActionDropdown>
    ),
    {
      notes: { markdown }
    }
  )
  .add("disabled", () => <ActionDropdown disabled />);
