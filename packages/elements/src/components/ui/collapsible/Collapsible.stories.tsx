import {
  Badge,
  Collapsible,
  CollapsibleClickableContent,
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
        <StatefulCollapsible label={"Engines"} />
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
                indeterminate={
                  thrusters.semi ? !thrusters.multi : thrusters.multi
                }
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
                  label={(thrusters.semi ? 1 : 0) + (thrusters.multi ? 1 : 0)}
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
    const [bb8, setBb8] = useState({ engine: false, motivator: false });

    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Parts</LargeText>
        </Row>
        <StatefulCollapsible
          label={"Astromech droids"}
          contentLeft={<Checkbox />}
        >
          <Collapsible
            label={"R2D2"}
            contentLeft={<Checkbox />}
            icon={faFolderOpen}
            iconCollapsed={faFolderPlus}
            iconSize={16}
            collapsed={true}
          />
          <Collapsible
            label={"C3PO"}
            contentLeft={<Checkbox />}
            icon={faFolderOpen}
            iconCollapsed={faFolderPlus}
            iconSize={16}
            collapsed={true}
          />
          <StatefulCollapsible
            label={"BB-8"}
            contentLeft={
              <Checkbox
                value={bb8.engine && bb8.motivator}
                indeterminate={bb8.engine ? !bb8.motivator : bb8.motivator}
                onClick={event => {
                  event.stopPropagation();
                  const value = bb8.engine || bb8.motivator;
                  setBb8({
                    engine: !value,
                    motivator: !value
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
              contentLeft={<Checkbox value={bb8.engine} />}
              onClick={() => setBb8(bb8 => ({ ...bb8, engine: !bb8.engine }))}
            >
              Engine
            </CollapsibleClickableContent>
            <CollapsibleClickableContent
              contentLeft={<Checkbox value={bb8.motivator} />}
              onClick={() =>
                setBb8(bb8 => ({ ...bb8, motivator: !bb8.motivator }))
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
    return (
      <Column width={300}>
        <Row indent={2} spacing={2}>
          <LargeText>Parts</LargeText>
        </Row>
        <StatefulCollapsible label={"Jedis"}>
          <CollapsibleGroupHeading>Dark side</CollapsibleGroupHeading>
          <CollapsibleClickableContent contentLeft={<Checkbox />}>
            Darth Vader
          </CollapsibleClickableContent>
          <CollapsibleClickableContent contentLeft={<Checkbox />}>
            Darth Maul
          </CollapsibleClickableContent>
          <CollapsibleGroupHeading>Light side</CollapsibleGroupHeading>
          <CollapsibleClickableContent contentLeft={<Checkbox />}>
            Master Yoda
          </CollapsibleClickableContent>
          <CollapsibleClickableContent contentLeft={<Checkbox />}>
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
