import { storiesOf } from "@storybook/react";
import * as React from "react";
import { GridExample } from "./GridExample";
import { GridExampleCustomValue } from "./GridExampleCustomValue";
import { GridExampleWithContext } from "./GridExampleWithContext";

storiesOf("grid/GridHooks", module)
  .add("standard", () => <GridExample />)
  .add("with GridHooksTable", () => <GridExampleWithContext />)
  .add("with custom value", () => <GridExampleCustomValue />);
