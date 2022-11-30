import {
  Box,
  Column,
  Indent,
  Row,
  Spacing,
  Text,
  useBoolean,
} from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
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
      <div />
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
  <Box indent={10} display="flex">
    <Row spacing={3} display={"inline-flex"}>
      <Tooltip label={"No variant"}>
        <Text>No variant</Text>
      </Tooltip>
      <Indent />

      <Tooltip label={"Standard"}>
        <Text>standard</Text>
      </Tooltip>
      <Indent />

      <Tooltip label={"Outlined"} variant={"outlined"}>
        <Text>outlined</Text>
      </Tooltip>
      <Indent />
    </Row>

    <Row spacing={3} display={"inline-flex"}>
      <Tooltip label={"Info"} variant={"info"}>
        <Text>info</Text>
      </Tooltip>
      <Indent />

      <Tooltip label={"Warning"} variant={"warning"}>
        <Text>warning</Text>
      </Tooltip>
      <Indent />

      <Tooltip label={"Oh no error error!"} variant={"error"}>
        <Text>error</Text>
      </Tooltip>
    </Row>
  </Box>
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
