import { Indent } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import * as React from "react";

export default {
  title: "core/Layout/Indent",
  decorators: [withInfo({ propTables: false })]
};

export const Standard = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Indent>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px"
          }}
        />
      </Indent>
    </div>
  </div>
);

Standard.story = {
  name: "standard"
};

export const WithNum2 = () => (
  <div style={{ display: "table" }}>
    <div style={{ border: "1px solid black" }}>
      <Indent num={2}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px"
          }}
        />
      </Indent>
    </div>
  </div>
);

WithNum2.story = {
  name: "with num=2"
};
