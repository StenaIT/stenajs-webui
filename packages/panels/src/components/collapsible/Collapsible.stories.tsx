import {
  ButtonElementProps,
  Clickable,
  Column,
  Row,
  Space,
  Text,
} from "@stenajs-webui/core";
import {
  Badge,
  Banner,
  FlatButton,
  Icon,
  PrimaryButton,
  stenaPlusCircle,
  stenaSearch,
  stenaTrash,
  Tag,
} from "@stenajs-webui/elements";
import { Checkbox, RadioButton, Switch, TextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { ReactNode, useState } from "react";
import { Collapsible, CollapsibleProps } from "./Collapsible";
import { CollapsibleGroupHeading } from "./CollapsibleGroupHeading";
import {
  CollapsibleWithCheckbox,
  CollapsibleWithCheckboxProps,
} from "./CollapsibleWithCheckbox";
import { cssColor } from "@stenajs-webui/theme";
import { CollapsibleList } from "./CollapsibleList";

export default {
  title: "panels/Collapsible",
  component: Collapsible,
  subcomponents: {
    CollapsibleGroupHeading,
    CollapsibleWithCheckbox,
  },
};

function xor(...values: boolean[]) {
  const sum = values.reduce(
    (acc: number, value: boolean) => acc + Number(value),
    0,
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

interface CollapsibleClickableContentProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  children?: ReactNode;
  onClick?: ButtonElementProps["onClick"];
}

const ButtonRow: React.FC<CollapsibleClickableContentProps> = ({
  contentLeft,
  contentRight,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0 8px 4px 16px",
        minHeight: "40px",
      }}
    >
      <Row alignItems={"center"} justifyContent={"space-between"} gap={2}>
        <Row gap={2} alignItems={"center"}>
          {contentLeft}
          {children}
        </Row>
        {contentRight}
      </Row>
    </button>
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
      <CollapsibleList>
        <StatefulCollapsible
          label={"Engines"}
          collapsed={true}
        ></StatefulCollapsible>
        <StatefulCollapsible label={"Boosters"}>
          <CollapsibleGroupHeading>Search boosters</CollapsibleGroupHeading>
          <TextInput iconRight={stenaSearch} />

          <ButtonRow
            contentLeft={<Checkbox value={boosters.new} />}
            onClick={() =>
              setBoosters((boosters) => ({ ...boosters, new: !boosters.new }))
            }
          >
            X-58 (New)
          </ButtonRow>

          <ButtonRow
            contentLeft={<Checkbox value={boosters.secondHand} />}
            onClick={() =>
              setBoosters((boosters) => ({
                ...boosters,
                secondHand: !boosters.secondHand,
              }))
            }
          >
            X-58 (Second hand)
          </ButtonRow>
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
                <Badge
                  label={Number(thrusters.semi) + Number(thrusters.multi)}
                />
              )
            }
          >
            <ButtonRow
              contentLeft={<Checkbox value={thrusters.semi} />}
              onClick={() =>
                setThrusters((thrusters) => ({
                  ...thrusters,
                  semi: !thrusters.semi,
                }))
              }
            >
              Semi
            </ButtonRow>
            <ButtonRow
              contentLeft={<Checkbox value={thrusters.multi} />}
              onClick={() =>
                setThrusters((thrusters) => ({
                  ...thrusters,
                  multi: !thrusters.multi,
                }))
              }
            >
              Multi
            </ButtonRow>
          </StatefulCollapsibleWithCheckbox>
        </StatefulCollapsible>
      </CollapsibleList>
    </Column>
  );
};

export const Levels = () => {
  return (
    <Column width={300}>
      <CollapsibleList>
        <StatefulCollapsible label={"Level 1"}>
          <ButtonRow>Level 2</ButtonRow>
          <StatefulCollapsible label={"Level 2"}>
            <ButtonRow>Level 3</ButtonRow>
            <ButtonRow>Level 3</ButtonRow>
          </StatefulCollapsible>
          <ButtonRow>Level 2</ButtonRow>
        </StatefulCollapsible>
        <StatefulCollapsible label={"Level 1"}>
          <StatefulCollapsible label={"Level 2"}>
            <ButtonRow>Level 3</ButtonRow>
          </StatefulCollapsible>
        </StatefulCollapsible>
      </CollapsibleList>
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
      <CollapsibleList>
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
          <ButtonRow
            contentLeft={<Checkbox value={state.monkeys} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                monkeys: !state.monkeys,
              }))
            }
          >
            Monkeys
          </ButtonRow>
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
            <ButtonRow
              contentLeft={<Checkbox value={state.cats} />}
              onClick={() =>
                setState((state) => ({
                  ...state,
                  cats: !state.cats,
                }))
              }
            >
              Cats
            </ButtonRow>
            <ButtonRow
              contentLeft={<Checkbox value={state.dogs} />}
              onClick={() =>
                setState((state) => ({
                  ...state,
                  dogs: !state.dogs,
                }))
              }
            >
              Dogs
            </ButtonRow>
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
          <ButtonRow
            contentLeft={<Checkbox value={state.apples} />}
            onClick={() =>
              setState((state) => ({
                ...state,
                apples: !state.apples,
              }))
            }
          >
            Apples
          </ButtonRow>
        </StatefulCollapsibleWithCheckbox>
      </CollapsibleList>
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
      <CollapsibleList>
        <StatefulCollapsible label={"Jedis"}>
          <CollapsibleGroupHeading>Dark side</CollapsibleGroupHeading>
          <ButtonRow
            contentLeft={<Checkbox checked={state[0]} />}
            onClick={() => setState((state) => ({ ...state, 0: !state[0] }))}
          >
            Darth Vader
          </ButtonRow>
          <ButtonRow
            contentLeft={<Checkbox checked={state[1]} />}
            onClick={() => setState((state) => ({ ...state, 1: !state[1] }))}
          >
            Darth Maul
          </ButtonRow>
          <CollapsibleGroupHeading>Light side</CollapsibleGroupHeading>
          <ButtonRow
            contentLeft={<Checkbox checked={state[2]} />}
            onClick={() => setState((state) => ({ ...state, 2: !state[2] }))}
          >
            Master Yoda
          </ButtonRow>
          <ButtonRow
            contentLeft={<Checkbox checked={state[3]} />}
            onClick={() => setState((state) => ({ ...state, 3: !state[3] }))}
          >
            Ozcar-One SoNoobie
          </ButtonRow>
        </StatefulCollapsible>
      </CollapsibleList>
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
      <CollapsibleList>
        <StatefulCollapsible label={"Astromech droids"}>
          <ButtonRow
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
                <Icon icon={stenaTrash} />
              </Clickable>
            }
          >
            R2D2
          </ButtonRow>
          <ButtonRow
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
                <Icon icon={stenaTrash} />
              </Clickable>
            }
          >
            C3PO
          </ButtonRow>
          <ButtonRow
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
                <Icon icon={stenaTrash} />
              </Clickable>
            }
          >
            BB-8
          </ButtonRow>
          <ButtonRow
            contentLeft={
              <Icon icon={stenaPlusCircle} size={24} data-hover={true} />
            }
            onClick={() => alert("Added")}
          >
            Add new mech
          </ButtonRow>
        </StatefulCollapsible>
      </CollapsibleList>
    </Column>
  );
};

export const CrazyStory = () => {
  const [active, setActive] = useState(true);

  return (
    <Column spacing indent background={cssColor("--lhds-color-ui-200")}>
      <Column width={300} background={cssColor("--lhds-color-ui-50")}>
        <CollapsibleList>
          <StatefulCollapsible
            label={"Focus with very long label text that should wrap correctly"}
            collapsed
          />
          <StatefulCollapsible
            label={"Hover"}
            contentRight={<Tag size={"small"} label={"12"} />}
          >
            <CollapsibleGroupHeading>Grouped header</CollapsibleGroupHeading>
            <ButtonRow
              contentRight={<FlatButton leftIcon={stenaTrash} size={"small"} />}
              onClick={() => alert("Deleted")}
            >
              Hover on row with icon
            </ButtonRow>
            <ButtonRow
              contentRight={<FlatButton leftIcon={stenaTrash} size={"small"} />}
              onClick={() => alert("Deleted")}
            >
              Hover on icon
            </ButtonRow>
            <ButtonRow
              contentRight={<Switch value={active} />}
              onClick={() => setActive(!active)}
            >
              With switch
            </ButtonRow>
          </StatefulCollapsible>
          <StatefulCollapsible
            label={"With counter"}
            contentRight={<Tag size={"small"} label={"12"} />}
            collapsed
          />
        </CollapsibleList>
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
