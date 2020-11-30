import * as React from "react";
import { Indent } from "./Indent";

export default {
  title: "core/Layout/Indent",
  component: Indent,
};

export const Standard = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Indent>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Indent>
    </div>
  </div>
);

export const WithNum2 = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Indent num={2}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Indent>
    </div>
  </div>
);
