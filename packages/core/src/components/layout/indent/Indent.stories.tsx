import { Indent } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Layout/Indent", module)
  .addDecorator(withInfo({ propTables: false }))
  .add("standard", () => (
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
  ))
  .add("with num=2", () => (
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
  ));
