import * as React from "react";
import { GridExample } from "./GridExample";
import { GridExampleCustomValue } from "./GridExampleCustomValue";
import { GridExampleWithContext } from "./GridExampleWithContext";

export default {
  title: "examples/Grid/GridHooks"
};

export const Standard = () => <GridExample />;

Standard.storyName = "standard";

export const WithGridHooksTable = () => <GridExampleWithContext />;

WithGridHooksTable.storyName = "with GridHooksTable";

export const WithCustomValue = () => <GridExampleCustomValue />;

WithCustomValue.storyName = "with custom value";
