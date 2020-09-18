import { ErrorPanel } from "@stenajs-webui/panels";
import * as React from "react";

export default {
  title: "panels/Error/ErrorPanel"
};

export const Standard = () => <ErrorPanel />;

export const WithText = () => <ErrorPanel text={"Oups, I did it again!"} />;
