import { ErrorPanel } from "./ErrorPanel";
import * as React from "react";

export default {
  title: "panels/Error/ErrorPanel",
  component: ErrorPanel,
};

export const Standard = () => <ErrorPanel />;

export const WithText = () => <ErrorPanel text={"Oups, I did it again!"} />;
