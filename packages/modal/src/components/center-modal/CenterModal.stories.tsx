import * as React from "react";
import { Text } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { CenterModal } from "./CenterModal";

export default {
  title: "modal/CenterModal",
  component: CenterModal,
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <PrimaryButton label={"Not clickable"} onClick={() => alert("Oupsies")} />
    <CenterModal isOpen>
      <Text>Some modal stuff</Text>
    </CenterModal>
  </div>
);

export const WithHeaderAndIcon = () => (
  <div style={{ display: "inline-block" }}>
    <PrimaryButton label={"Not clickable"} onClick={() => alert("Oupsies")} />
    <CenterModal isOpen>
      <Text>Some modal stuff</Text>
    </CenterModal>
  </div>
);
