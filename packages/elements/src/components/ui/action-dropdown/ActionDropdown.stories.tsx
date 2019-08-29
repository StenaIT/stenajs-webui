import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { ActionDropdown, ActionDropdownItem } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/ActionDropdown", module).add("standard", () => (
  <ActionDropdown>
    <ActionDropdownItem label={"Open"} />
    <ActionDropdownItem label={"Save"} icon={faSave} />
    <ActionDropdownItem label={"Save as"} />
    <ActionDropdownItem label={"Close"} />
  </ActionDropdown>
));
