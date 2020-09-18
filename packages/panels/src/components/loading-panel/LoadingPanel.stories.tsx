import { LoadingPanel } from "@stenajs-webui/panels";
import * as React from "react";

export default {
  title: "panels/Loading/LoadingPanel"
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <LoadingPanel />
  </div>
);

Standard.storyName = "standard";

export const WithText = () => (
  <div style={{ display: "inline-block" }}>
    <LoadingPanel text={"Loading your booking..."} />
  </div>
);

WithText.storyName = "with text";
