import * as React from "react";
import { GridExample } from "./GridExample";
import { GridExampleCustomValue } from "./GridExampleCustomValue";
import { GridExampleWithContext } from "./GridExampleWithContext";

export default {
  title: "examples/Grid/GridHooks",
};

export const Standard = () => <GridExample />;

export const WithGridHooksTable = () => <GridExampleWithContext />;

export const WithCustomValue = () => <GridExampleCustomValue />;
