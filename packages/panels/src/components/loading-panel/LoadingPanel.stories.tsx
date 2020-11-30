import { LoadingPanel } from "./LoadingPanel";
import * as React from "react";

export default {
  title: "panels/Loading/LoadingPanel",
  component: LoadingPanel,
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <LoadingPanel />
  </div>
);

export const WithText = () => (
  <div style={{ display: "inline-block" }}>
    <LoadingPanel text={"Loading your booking..."} />
  </div>
);
