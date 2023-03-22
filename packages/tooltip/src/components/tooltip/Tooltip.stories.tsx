import { Column, Row, Spacing, Text, useBoolean } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { useEffect } from "react";
import { Tooltip } from "./Tooltip";

export default {
  title: "tooltip/Tooltip",
  component: Tooltip,
};

export const Standard = () => (
  <>
    <Row justifyContent={"space-between"} spacing={10}>
      <Tooltip placement={"bottom"} label={"Nice content on bottom"}>
        <Text>Hover me</Text>
      </Tooltip>
      <Tooltip placement={"left"} label={"Nice content on left"}>
        <Text>Hover me</Text>
      </Tooltip>
      <Tooltip placement={"right"} label={"Nice content on right"}>
        <Text>Hover me</Text>
      </Tooltip>
    </Row>
    <Row justifyContent={"center"}>
      <Tooltip placement={"top"} label={"Nice content on top"}>
        <Text>Hover me</Text>
      </Tooltip>
    </Row>
  </>
);

export const ClickTrigger = () => (
  <Row justifyContent={"space-between"} spacing={10}>
    <Tooltip label={"Way to go!"} trigger={"click"}>
      <Text>Click me</Text>
    </Tooltip>
  </Row>
);

export const WithButton = () => (
  <Column justifyContent={"flex-start"} width={"fit-content"} spacing={10}>
    <Tooltip label={"Big success!"} trigger={"click"}>
      <PrimaryButton label={"Click me"} />
    </Tooltip>
  </Column>
);

export const Variants = () => (
  <Column alignItems={"flex-start"} spacing={10} gap={5}>
    <Tooltip label={"Standard"}>
      <Text>standard</Text>
    </Tooltip>

    <Tooltip label={"Info"} variant={"info"}>
      <Text color={cssColor("--lhds-color-blue-700")}>info</Text>
    </Tooltip>

    <Tooltip label={"Warning"} variant={"warning"}>
      <Text color={cssColor("--lhds-color-orange-700")}>warning</Text>
    </Tooltip>

    <Tooltip label={"Error, shame!"} variant={"error"}>
      <Text color={cssColor("--lhds-color-red-700")}>error</Text>
    </Tooltip>

    <Tooltip label={"Error, shame! Lorem ipsum. Lorem ipsum"} maxWidth={200}>
      <Text>Multi row fixed width 200</Text>
    </Tooltip>
    <Tooltip
      label={"We need to inform about many things. Please read this."}
      variant={"warning"}
      maxWidth={250}
    >
      <Text color={cssColor("--lhds-color-orange-700")}>
        Multi row fixed width 250 warning
      </Text>
    </Tooltip>

    <Tooltip
      placement="bottom"
      label={`We need to inform about many things.
      Please read this.`}
      maxWidth={150}
    >
      <Text color={cssColor("--lhds-color-orange-700")}>
        Multi row fixed width 250 warning
      </Text>
    </Tooltip>

    <Tooltip
      label={`This is my tooltip, there's many like them, but this one is mine!
    There are many colours in the world, but the coolest color is surely the tooltip color.
    If I had a coin for everytime I saw a tooltip, I'd have many coins.
    Tooltips will soon take over the world.
    AI bots has nothing on tooltips.`}
      placement="bottom"
    >
      <Text>Tooltip with lots of text</Text>
    </Tooltip>

    <Tooltip
      label={`This is my tooltip, there's many like them, but this one is mine!
    There are many colours in the world, but the coolest color is surely the tooltip color.
    If I had a coin for everytime I saw a tooltip, I'd have many coins.
    Tooltips will soon take over the world.
    AI bots has nothing on tooltips.`}
      placement="bottom"
      variant={"error"}
    >
      <Text color={cssColor("--lhds-color-red-700")}>
        Tooltip with lots of text
      </Text>
    </Tooltip>
  </Column>
);

export const Disabled = () => {
  const [disabled, , , toggle] = useBoolean(false);

  useEffect(() => {
    const r = setInterval(toggle, 2000);
    return () => clearInterval(r);
  }, [toggle]);

  return (
    <Column justifyContent={"flex-start"} width={"fit-content"} spacing={10}>
      <Tooltip label={"Big success!"} disabled={disabled}>
        <PrimaryButton label={"Hover me"} />
      </Tooltip>
      <Spacing />
      <Text>Disabled={disabled ? "true" : "false"}</Text>
    </Column>
  );
};
