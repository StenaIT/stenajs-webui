import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { Clickable, Column, Row, Space, Text } from "@stenajs-webui/core";
import {
  Badge,
  Banner,
  FlatButton,
  Icon,
  PrimaryButton,
  Tag,
  stenaTrash,
  stenaSearch,
  stenaPlusCircle,
} from "@stenajs-webui/elements";
import { Checkbox, RadioButton, Switch, TextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { useState } from "react";
import { Collapsible, CollapsibleProps } from "./Collapsible";
import { CollapsibleClickableContent } from "./CollapsibleClickableContent";
import { CollapsibleContent } from "./CollapsibleContent";
import { CollapsibleGroupHeading } from "./CollapsibleGroupHeading";
import {
  CollapsibleWithCheckbox,
  CollapsibleWithCheckboxProps,
} from "./CollapsibleWithCheckbox";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "panels/Collapsible",
  component: Collapsible,
  subcomponents: {
    CollapsibleClickableContent,
    CollapsibleContent,
    CollapsibleGroupHeading,
    CollapsibleWithCheckbox,
  },
};

function xor(...values: boolean[]) {
  const sum = values.reduce(
    (acc: number, value: boolean) => acc + Number(value),
    0
  );
  return sum > 0 && sum < values.length;
}

const StatefulCollapsibleWithCheckbox: React.FC<
  CollapsibleWithCheckboxProps
> = (props) => {
  const [collapsed, setCollapsed] = useState(Boolean(props.collapsed));

  return (
    <CollapsibleWithCheckbox
      {...props}
      onClick={() => setCollapsed(!collapsed)}
      collapsed={collapsed}
    />
  );
};
const StatefulCollapsible: React.FC<CollapsibleProps> = (props) => {
  const [collapsed, setCollapsed] = useState(Boolean(props.collapsed));

  return (
    <Collapsible
      {...props}
      onClick={() => setCollapsed(!collapsed)}
      collapsed={collapsed}
    />
  );
};

export const Overview = () => {
  const [boosters, setBoosters] = useState({ new: false, secondHand: false });
  const [thrusters, setThrusters] = useState({ semi: true, multi: false });

  return (
    <Column width={300}>
      <Row indent={2} spacing={2}>
        <Text size={"large"}>Spaceship parts</Text>
      </Row>
      <StatefulCollapsible label={"Engines"} collapsed={true}>
        <CollapsibleContent />
      </StatefulCollapsible>
      <StatefulCollapsible label={"Boosters"}>
        <CollapsibleGroupHeading>Search boosters</CollapsibleGroupHeading>
        <CollapsibleContent>
          <TextInput iconRight={stenaSearch} />
        </CollapsibleContent>
        <CollapsibleClickableContent
          contentLeft={<Checkbox value={boosters.new} />}
          onClick={() =>
            setBoosters((boosters) => ({ ...boosters, new: !boosters.new }))
          }
        >
          X-58 (New)
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={<Checkbox value={boosters.secondHand} />}
          onClick={() =>
            setBoosters((boosters) => ({
              ...boosters,
              secondHand: !boosters.secondHand,
            }))
          }
        >
          X-58 (Second hand)
        </CollapsibleClickableContent>
      </StatefulCollapsible>
      <StatefulCollapsible label={"Thrusters"}>
        <StatefulCollapsibleWithCheckbox
          value={thrusters.semi && thrusters.multi}
          indeterminate={xor(thrusters.semi, thrusters.multi)}
          onChange={() => {
            const value = thrusters.semi || thrusters.multi;
            setThrusters({
              semi: !value,
              multi: !value,
            });
          }}
          label={"FF-12"}
          contentRight={
            (thrusters.semi || thrusters.multi) && (
              <Badge label={Number(thrusters.semi) + Number(thrusters.multi)} />
            )
          }
        >
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={thrusters.semi} />}
            onClick={() =>
              setThrusters((thrusters) => ({
                ...thrusters,
                semi: !thrusters.semi,
              }))
            }
          >
            Semi
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={thrusters.multi} />}
            onClick={() =>
              setThrusters((thrusters) => ({
                ...thrusters,
                multi: !thrusters.multi,
              }))
            }
          >
            Multi
          </CollapsibleClickableContent>
        </StatefulCollapsibleWithCheckbox>
      </StatefulCollapsible>
    </Column>
  );
};

export const Levels = () => {
  return (
    <Column width={300}>
      <StatefulCollapsible label={"Level 1"}>
        <CollapsibleClickableContent>Level 2</CollapsibleClickableContent>
        <StatefulCollapsible label={"Level 2"}>
          <CollapsibleClickableContent>Level 3</CollapsibleClickableContent>
          <CollapsibleClickableContent>Level 3</CollapsibleClickableContent>
        </StatefulCollapsible>
        <CollapsibleClickableContent>Level 2</CollapsibleClickableContent>
      </StatefulCollapsible>
      <StatefulCollapsible label={"Level 1"}>
        <StatefulCollapsible label={"Level 2"}>
          <CollapsibleClickableContent>Level 3</CollapsibleClickableContent>
        </StatefulCollapsible>
      </StatefulCollapsible>
    </Column>
  );
};

export const LevelsWithCheckboxes = () => {
  const [state, setState] = useState({
    monkeys: false,
    cats: false,
    dogs: false,
    apples: false,
  });

  return (
    <Column width={300}>
      <StatefulCollapsibleWithCheckbox
        label={"Animals"}
        value={state.cats && state.dogs && state.monkeys}
        indeterminate={xor(state.cats, state.dogs, state.monkeys)}
        onChange={() => {
          const value = state.cats || state.dogs || state.monkeys;
          setState({
            ...state,
            monkeys: !value,
            cats: !value,
            dogs: !value,
          });
        }}
      >
        <CollapsibleClickableContent
          contentLeft={<Checkbox value={state.monkeys} />}
          onClick={() =>
            setState((state) => ({
              ...state,
              monkeys: !state.monkeys,
            }))
          }
        >
          Monkeys
        </CollapsibleClickableContent>
        <StatefulCollapsibleWithCheckbox
          label={"Pets"}
          value={state.cats && state.dogs}
          indeterminate={xor(state.cats, state.dogs)}
          onChange={() => {
            const value = state.cats || state.dogs;
            setState({
              ...state,
              cats: !value,
              dogs: !value,
            });
          }}
        >
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={state.cats} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                cats: !state.cats,
              }))
            }
          >
            Cats
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={state.dogs} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                dogs: !state.dogs,
              }))
            }
          >
            Dogs
          </CollapsibleClickableContent>
        </StatefulCollapsibleWithCheckbox>
      </StatefulCollapsibleWithCheckbox>
      <StatefulCollapsibleWithCheckbox
        label={"Fruits"}
        value={state.apples}
        onChange={() => {
          setState((state) => ({
            ...state,
            apples: !state.apples,
          }));
        }}
      >
        <CollapsibleClickableContent
          contentLeft={<Checkbox value={state.apples} />}
          onClick={() =>
            setState((state) => ({
              ...state,
              apples: !state.apples,
            }))
          }
        >
          Apples
        </CollapsibleClickableContent>
      </StatefulCollapsibleWithCheckbox>
    </Column>
  );
};

export const AlternativeIcons = () => {
  const [state, setState] = useState({
    r2d2: false,
    c3po: false,
    bb8: { engine: false, motivator: false },
  });

  return (
    <Column width={300}>
      <Row indent={2} spacing={2}>
        <Text size={"large"}>Parts</Text>
      </Row>
      <StatefulCollapsibleWithCheckbox
        label={"Astromech droids"}
        icon={faFolderOpen}
        iconCollapsed={faFolder}
        iconSize={16}
        value={
          state.r2d2 && state.c3po && state.bb8.engine && state.bb8.motivator
        }
        indeterminate={xor(
          state.r2d2,
          state.c3po,
          state.bb8.engine,
          state.bb8.motivator
        )}
        onChange={() => {
          const value =
            state.r2d2 || state.c3po || state.bb8.engine || state.bb8.motivator;
          setState({
            ...state,
            c3po: !value,
            r2d2: !value,
            bb8: { ...state.bb8, engine: !value, motivator: !value },
          });
        }}
      >
        <Collapsible
          label={"R2D2"}
          contentLeft={
            <Checkbox
              checked={state.r2d2}
              onClick={() =>
                setState((state) => ({ ...state, r2d2: !state.r2d2 }))
              }
            />
          }
          icon={faFolderOpen}
          iconCollapsed={faFolder}
          iconSize={16}
          collapsed={true}
        />
        <Collapsible
          label={"C3PO"}
          contentLeft={
            <Checkbox
              checked={state.c3po}
              onClick={() =>
                setState((state) => ({ ...state, c3po: !state.c3po }))
              }
            />
          }
          icon={faFolderOpen}
          iconCollapsed={faFolder}
          iconSize={16}
          collapsed={true}
        />
        <StatefulCollapsible
          label={"BB-8"}
          contentLeft={
            <Checkbox
              value={state.bb8.engine && state.bb8.motivator}
              indeterminate={xor(state.bb8.engine, state.bb8.motivator)}
              onClick={(event) => {
                event.stopPropagation();
                const value = state.bb8.engine || state.bb8.motivator;
                setState({
                  ...state,
                  bb8: { ...state.bb8, engine: !value, motivator: !value },
                });
              }}
            />
          }
          icon={faFolderOpen}
          iconCollapsed={faFolder}
          collapsed={false}
          iconSize={16}
        >
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={state.bb8.engine} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                bb8: { ...state.bb8, engine: !state.bb8.engine },
              }))
            }
          >
            Engine
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={state.bb8.motivator} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                bb8: { ...state.bb8, motivator: !state.bb8.motivator },
              }))
            }
          >
            Motivator
          </CollapsibleClickableContent>
        </StatefulCollapsible>
      </StatefulCollapsibleWithCheckbox>
    </Column>
  );
};

export const GroupHeaders = () => {
  const [state, setState] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  return (
    <Column width={300}>
      <Row indent={2} spacing={2}>
        <Text size={"large"}>Parts</Text>
      </Row>
      <StatefulCollapsible label={"Jedis"}>
        <CollapsibleGroupHeading>Dark side</CollapsibleGroupHeading>
        <CollapsibleClickableContent
          contentLeft={<Checkbox checked={state[0]} />}
          onClick={() => setState((state) => ({ ...state, 0: !state[0] }))}
        >
          Darth Vader
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={<Checkbox checked={state[1]} />}
          onClick={() => setState((state) => ({ ...state, 1: !state[1] }))}
        >
          Darth Maul
        </CollapsibleClickableContent>
        <CollapsibleGroupHeading>Light side</CollapsibleGroupHeading>
        <CollapsibleClickableContent
          contentLeft={<Checkbox checked={state[2]} />}
          onClick={() => setState((state) => ({ ...state, 2: !state[2] }))}
        >
          Master Yoda
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={<Checkbox checked={state[3]} />}
          onClick={() => setState((state) => ({ ...state, 3: !state[3] }))}
        >
          Ozcar-One SoNoobie
        </CollapsibleClickableContent>
      </StatefulCollapsible>
    </Column>
  );
};

export const RadioButtons = () => {
  const [active, setActive] = useState<"r2d2" | "c3po" | "bb-8">("r2d2");

  return (
    <Column width={300}>
      <Row indent={2} spacing={2}>
        <Text size={"large"}>Parts</Text>
      </Row>
      <StatefulCollapsible label={"Astromech droids"}>
        <CollapsibleClickableContent
          contentLeft={<RadioButton checked={active === "r2d2"} />}
          onClick={() => setActive("r2d2")}
          contentRight={
            <Clickable
              data-hidden={true}
              onClickCapture={(event) => {
                event.stopPropagation();
                alert("Removed");
              }}
            >
              <Icon icon={stenaTrash} hoverColor={"#C62F37"} />
            </Clickable>
          }
        >
          R2D2
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={<RadioButton checked={active === "c3po"} />}
          onClick={() => setActive("c3po")}
          contentRight={
            <Clickable
              data-hidden={true}
              onClickCapture={(event) => {
                event.stopPropagation();
                alert("Removed");
              }}
            >
              <Icon icon={stenaTrash} hoverColor={"#C62F37"} />
            </Clickable>
          }
        >
          C3PO
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={<RadioButton checked={active === "bb-8"} />}
          onClick={() => setActive("bb-8")}
          contentRight={
            <Clickable
              data-hidden={true}
              onClickCapture={(event) => {
                event.stopPropagation();
                alert("Removed");
              }}
            >
              <Icon icon={stenaTrash} hoverColor={"#C62F37"} />
            </Clickable>
          }
        >
          BB-8
        </CollapsibleClickableContent>
        <CollapsibleClickableContent
          contentLeft={
            <Icon icon={stenaPlusCircle} size={24} data-hover={true} />
          }
          onClick={() => alert("Added")}
        >
          Add new mech
        </CollapsibleClickableContent>
      </StatefulCollapsible>
    </Column>
  );
};

export const CrazyStory = () => {
  const [active, setActive] = useState(true);

  return (
    <Column spacing indent background={cssColor("--lhds-color-ui-200")}>
      <Column width={300} background={cssColor("--lhds-color-ui-50")}>
        <StatefulCollapsible
          label={"Focus with very long label text that should wrap correctly"}
          collapsed
        />
        <StatefulCollapsible
          label={"Hover"}
          contentRight={<Tag size={"small"} label={"12"} />}
        >
          <CollapsibleGroupHeading>Grouped header</CollapsibleGroupHeading>
          <CollapsibleClickableContent
            contentRight={<FlatButton leftIcon={stenaTrash} size={"small"} />}
            onClick={() => alert("Deleted")}
          >
            Hover on row with icon
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentRight={<FlatButton leftIcon={stenaTrash} size={"small"} />}
            onClick={() => alert("Deleted")}
          >
            Hover on icon
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentRight={<Switch value={active} />}
            onClick={() => setActive(!active)}
          >
            With switch
          </CollapsibleClickableContent>
        </StatefulCollapsible>
        <StatefulCollapsible
          label={"With counter"}
          contentRight={<Tag size={"small"} label={"12"} />}
          collapsed
        />
        <Row justifyContent={"center"} spacing={2} indent>
          <PrimaryButton
            label={"Apply button"}
            onClick={() => alert("Applied")}
          />
        </Row>
        <Column indent>
          <Banner variant={"error"} text={"Error message"} />
          <Space />
        </Column>
      </Column>
    </Column>
  );
};
