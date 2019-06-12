import {
  GridExample,
  GridExampleCustomValue,
  GridExampleWithContext
} from "@stenajs-webui/grid";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("examples/Grid/GridHooks", module)
  .add("standard", () => <GridExample />)
  .add("with GridHooksTable", () => <GridExampleWithContext />)
  .add("with custom value", () => <GridExampleCustomValue />);
