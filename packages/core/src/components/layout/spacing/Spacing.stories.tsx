import { Spacing } from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "core/Layout/Spacing",
};

export const Standard = () => (
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
