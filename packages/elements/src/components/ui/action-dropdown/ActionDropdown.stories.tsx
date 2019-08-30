import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { ActionDropdown, ActionDropdownItem } from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ActionDropdownSeparator } from "./ActionDropdownSeparator";

const hello = () => alert("hello");

storiesOf("elements/ActionDropdown", module).add("standard", () => (
  <ActionDropdown>
    <ActionDropdownItem label={"Open"} onClick={hello} />
    <ActionDropdownItem label={"Save"} icon={faSave} onClick={hello} />
    <ActionDropdownItem
      label={"Put on fire"}
      icon={faFire}
      onClick={hello}
      disabled
    />
    <ActionDropdownItem label={"Save as"} onClick={hello} />
    <ActionDropdownItem label={"Close"} onClick={hello} />
    <ActionDropdownItem label={"Disabled"} disabled onClick={hello} />
    <ActionDropdownItem label={"Autosave"}>
      <Checkbox value={true} />
    </ActionDropdownItem>
    <ActionDropdownItem label={"Something"}>
      <Checkbox value={false} />
    </ActionDropdownItem>
    <ActionDropdownSeparator />
    <ActionDropdownItem label={"Quit"} text={"cmd+q"} onClick={hello} />
  </ActionDropdown>
));
