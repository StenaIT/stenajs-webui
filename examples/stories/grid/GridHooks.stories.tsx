import * as React from "react";
import { GridExample } from "./GridExample";
import { GridExampleCustomValue } from "./GridExampleCustomValue";
import { GridExampleWithContext } from "./GridExampleWithContext";

export default {
  title: "examples/Grid/GridHooks"
};

export const Standard = () => <GridExample />;

Standard.story = {
  name: "standard"
};

export const WithGridHooksTable = () => <GridExampleWithContext />;

WithGridHooksTable.story = {
  name: "with GridHooksTable"
};

export const WithCustomValue = () => <GridExampleCustomValue />;

WithCustomValue.story = {
  name: "with custom value"
};
