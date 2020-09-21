import { LoadingModal } from "@stenajs-webui/panels";
import * as React from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { PrimaryButton } from "@stenajs-webui/elements";

export default {
  title: "panels/Loading/LoadingModal",
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <PrimaryButton label={"Not clickable"} onClick={() => alert("Oupsies")} />
    <LoadingModal />
  </div>
);

export const WithHeaderAndIcon = () => (
  <div style={{ display: "inline-block" }}>
    <PrimaryButton label={"Not clickable"} onClick={() => alert("Oupsies")} />
    <LoadingModal headerText={"Saving agreement..."} headerIconLeft={faLock} />
  </div>
);
