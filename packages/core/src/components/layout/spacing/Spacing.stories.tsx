import * as React from "react";
import { Spacing } from "./Spacing";

export default {
  title: "core/Layout/Spacing",
  component: Spacing,
};

export const Overview = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Spacing>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Spacing>
    </div>
  </div>
);

export const WithNum2 = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Spacing num={2}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Spacing>
    </div>
  </div>
);
