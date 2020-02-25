import {
  Badge,
  Collapsible,
  CollapsibleGroupHeading,
  CollapsibleProps,
  CollapsibleSimpleContent,
  Icon
} from "@stenajs-webui/elements";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Column } from "@stenajs-webui/core";
import { Checkbox, CheckboxProps, Switch } from "@stenajs-webui/forms";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons/faFolderPlus";

const StatefulCollapsible: React.FC<CollapsibleProps> = props => {
  const [collapsed, setCollapsed] = useState(Boolean(props.collapsed));

  return (
    <Collapsible
      {...props}
      onClick={() => setCollapsed(!collapsed)}
      collapsed={collapsed}
    />
  );
};

const StatefulCheckbox: React.FC<CheckboxProps> = props => {
  const [checked, setChecked] = useState(Boolean(props.checked));

  return (
    <Checkbox
      {...props}
      onClickCapture={event => {
        event.stopPropagation();
        setChecked(!checked);
      }}
      checked={checked}
    />
  );
};

storiesOf("elements/Collapsible", module)
  .add("single", () => (
    <Column width={300}>
      <StatefulCollapsible label={knobs.text("Label", "Label goes here")}>
        <CollapsibleSimpleContent
          contentLeft={<StatefulCheckbox />}
          label={"I'm content"}
        />
      </StatefulCollapsible>
    </Column>
  ))
  .add("multiple", () => (
    <Column width={300}>
      <StatefulCollapsible
        contentLeft={<StatefulCheckbox />}
        label={"Header with contentLeft"}
      >
        <CollapsibleGroupHeading label={"Checkboxes"} />
        <CollapsibleSimpleContent
          contentLeft={<StatefulCheckbox />}
          label={"Checkbox"}
        />
        <CollapsibleSimpleContent
          contentLeft={<StatefulCheckbox />}
          label={"With contentRight"}
          contentRight={<Switch />}
        />
      </StatefulCollapsible>
      <StatefulCollapsible
        label={"Header with contentRight"}
        contentRight={<Badge label={"4"} />}
      >
        <StatefulCollapsible label={"Many levels"}>
          <StatefulCollapsible label={"Deep down"}>
            <CollapsibleGroupHeading
              label={"Heading with contentRight"}
              contentRight={<Icon icon={faFolderPlus} />}
            />
            <CollapsibleSimpleContent label={"Text"} />
            <CollapsibleGroupHeading
              label={"Heading with contentLeft"}
              contentLeft={<StatefulCheckbox />}
            />
            <CollapsibleSimpleContent label={"More text"} />
          </StatefulCollapsible>
        </StatefulCollapsible>
      </StatefulCollapsible>
    </Column>
  ));
