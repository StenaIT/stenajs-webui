import {
  Badge,
  Collapsible,
  CollapsibleClickableContent,
  CollapsibleContent,
  CollapsibleGroupHeading,
  CollapsibleProps,
  Icon
} from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Clickable, Column, LargeText, Row } from "@stenajs-webui/core";
import { Checkbox, RadioButton } from "@stenajs-webui/forms";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons/faFolderPlus";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";

function xor(...values: boolean[]) {
  const sum = values.reduce(
    (acc: number, value: boolean) => acc + Number(value),
    0
  );
  return sum > 0 && sum < values.length;
}

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

storiesOf("elements/Collapsible", module)
  .add("Default", () => {
    const [boosters, setBoosters] = useState({ new: false, secondHand: false });
    const [thrusters, setThrusters] = useState({ semi: true, multi: false });

    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Spaceship parts</LargeText>
        </Row>
        <StatefulCollapsible label={"Engines"} collapsed={true}>
          <CollapsibleContent>
            <Column
              indent={1}
              spacing={1}
              flex={1}
              alignItems={"center"}
              style={{ opacity: 0.5 }}
            >
              <Icon icon={faInbox} />
              <span>No content</span>
            </Column>
          </CollapsibleContent>
        </StatefulCollapsible>
        <StatefulCollapsible label={"Boosters"}>
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={boosters.new} />}
            onClick={() =>
              setBoosters(boosters => ({ ...boosters, new: !boosters.new }))
            }
          >
            X-58 (New)
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox value={boosters.secondHand} />}
            onClick={() =>
              setBoosters(boosters => ({
                ...boosters,
                secondHand: !boosters.secondHand
              }))
            }
          >
            X-58 (Second hand)
          </CollapsibleClickableContent>
        </StatefulCollapsible>
        <StatefulCollapsible label={"Thrusters"}>
          <StatefulCollapsible
            contentLeft={
              <Checkbox
                value={thrusters.semi && thrusters.multi}
                indeterminate={xor(thrusters.semi, thrusters.multi)}
                onClick={event => {
                  event.stopPropagation();
                  const value = thrusters.semi || thrusters.multi;
                  setThrusters({
                    semi: !value,
                    multi: !value
                  });
                }}
              />
            }
            label={"FF-12"}
            contentRight={
              thrusters.semi || thrusters.multi ? (
                <Badge
                  label={Number(thrusters.semi) + Number(thrusters.multi)}
                />
              ) : (
                undefined
              )
            }
          >
            <CollapsibleClickableContent
              contentLeft={<Checkbox value={thrusters.semi} />}
              onClick={() =>
                setThrusters(thrusters => ({
                  ...thrusters,
                  semi: !thrusters.semi
                }))
              }
            >
              Semi
            </CollapsibleClickableContent>
            <CollapsibleClickableContent
              contentLeft={<Checkbox value={thrusters.multi} />}
              onClick={() =>
                setThrusters(thrusters => ({
                  ...thrusters,
                  multi: !thrusters.multi
                }))
              }
            >
              Multi
            </CollapsibleClickableContent>
          </StatefulCollapsible>
        </StatefulCollapsible>
      </Column>
    );
  })
  .add("Alternative icons", () => {
    const [state, setState] = useState({
      r2d2: false,
      c3po: false,
      bb8: { engine: false, motivator: false }
    });

    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Parts</LargeText>
        </Row>
        <StatefulCollapsible
          label={"Astromech droids"}
          contentLeft={
            <Checkbox
              checked={
                state.r2d2 &&
                state.c3po &&
                state.bb8.engine &&
                state.bb8.motivator
              }
              indeterminate={xor(
                state.r2d2,
                state.c3po,
                state.bb8.engine && state.bb8.motivator
              )}
              onClick={event => {
                event.stopPropagation();
                const value =
                  state.r2d2 ||
                  state.c3po ||
                  state.bb8.engine ||
                  state.bb8.motivator;
                setState({
                  ...state,
                  c3po: !value,
                  r2d2: !value,
                  bb8: { ...state.bb8, engine: !value, motivator: !value }
                });
              }}
            />
          }
        >
          <Collapsible
            label={"R2D2"}
            contentLeft={
              <Checkbox
                checked={state.r2d2}
                onClick={() =>
                  setState(state => ({ ...state, r2d2: !state.r2d2 }))
                }
              />
            }
            icon={faFolderOpen}
            iconCollapsed={faFolderPlus}
            iconSize={16}
            collapsed={true}
          />
          <Collapsible
            label={"C3PO"}
            contentLeft={
              <Checkbox
                checked={state.c3po}
                onClick={() =>
                  setState(state => ({ ...state, c3po: !state.c3po }))
                }
              />
            }
            icon={faFolderOpen}
            iconCollapsed={faFolderPlus}
            iconSize={16}
            collapsed={true}
          />
          <StatefulCollapsible
            label={"BB-8"}
            contentLeft={
              <Checkbox
                value={state.bb8.engine && state.bb8.motivator}
                indeterminate={xor(state.bb8.engine, state.bb8.motivator)}
                onClick={event => {
                  event.stopPropagation();
                  const value = state.bb8.engine || state.bb8.motivator;
                  setState({
                    ...state,
                    bb8: { ...state.bb8, engine: !value, motivator: !value }
                  });
                }}
              />
            }
            icon={faFolderOpen}
            iconCollapsed={faFolderPlus}
            collapsed={false}
            iconSize={16}
          >
            <CollapsibleClickableContent
              contentLeft={<Checkbox value={state.bb8.engine} />}
              onClick={() =>
                setState(state => ({
                  ...state,
                  bb8: { ...state.bb8, engine: !state.bb8.engine }
                }))
              }
            >
              Engine
            </CollapsibleClickableContent>
            <CollapsibleClickableContent
              contentLeft={<Checkbox value={state.bb8.motivator} />}
              onClick={() =>
                setState(state => ({
                  ...state,
                  bb8: { ...state.bb8, motivator: !state.bb8.motivator }
                }))
              }
            >
              Motivator
            </CollapsibleClickableContent>
          </StatefulCollapsible>
        </StatefulCollapsible>
      </Column>
    );
  })
  .add("Group headers", () => {
    const [state, setState] = useState({
      0: false,
      1: false,
      2: false,
      3: false
    });

    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Parts</LargeText>
        </Row>
        <StatefulCollapsible label={"Jedis"}>
          <CollapsibleGroupHeading>Dark side</CollapsibleGroupHeading>
          <CollapsibleClickableContent
            contentLeft={<Checkbox checked={state[0]} />}
            onClick={() => setState(state => ({ ...state, 0: !state[0] }))}
          >
            Darth Vader
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox checked={state[1]} />}
            onClick={() => setState(state => ({ ...state, 1: !state[1] }))}
          >
            Darth Maul
          </CollapsibleClickableContent>
          <CollapsibleGroupHeading>Light side</CollapsibleGroupHeading>
          <CollapsibleClickableContent
            contentLeft={<Checkbox checked={state[2]} />}
            onClick={() => setState(state => ({ ...state, 2: !state[2] }))}
          >
            Master Yoda
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={<Checkbox checked={state[3]} />}
            onClick={() => setState(state => ({ ...state, 3: !state[3] }))}
          >
            Ozcar-One SoNoobie
          </CollapsibleClickableContent>
        </StatefulCollapsible>
      </Column>
    );
  })
  .add("Radio buttons", () => {
    const [active, setActive] = useState<"r2d2" | "c3po" | "bb-8">("r2d2");

    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Parts</LargeText>
        </Row>
        <StatefulCollapsible label={"Astromech droids"}>
          <CollapsibleClickableContent
            contentLeft={<RadioButton checked={active === "r2d2"} />}
            onClick={() => setActive("r2d2")}
            contentRight={
              <Clickable
                data-hidden={true}
                onClickCapture={event => {
                  event.stopPropagation();
                  alert("Removed");
                }}
              >
                <Icon icon={faTrash} hoverColor={"#C62F37"} />
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
                onClickCapture={event => {
                  event.stopPropagation();
                  alert("Removed");
                }}
              >
                <Icon icon={faTrash} hoverColor={"#C62F37"} />
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
                onClickCapture={event => {
                  event.stopPropagation();
                  alert("Removed");
                }}
              >
                <Icon icon={faTrash} hoverColor={"#C62F37"} />
              </Clickable>
            }
          >
            BB-8
          </CollapsibleClickableContent>
          <CollapsibleClickableContent
            contentLeft={
              <Icon icon={faPlusCircle} size={24} data-hover={true} />
            }
            onClick={() => alert("Added")}
          >
            Add new mech
          </CollapsibleClickableContent>
        </StatefulCollapsible>
      </Column>
    );
  });
