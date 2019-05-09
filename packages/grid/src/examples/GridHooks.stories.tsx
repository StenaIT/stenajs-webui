import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { GridExample } from "./GridExample";
import { GridExampleCustomValue } from "./GridExampleCustomValue";
import { GridExampleWithContext } from "./GridExampleWithContext";

storiesOf("grid/GridHooks", module)
  .addDecorator(withInfo())
  .add("standard", () => <GridExample />)
  .add("with GridHooksTable", () => <GridExampleWithContext />)
  .add("with custom value", () => <GridExampleCustomValue />);
