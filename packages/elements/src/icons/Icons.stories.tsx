import * as React from "react";
import { IconDemoList } from "./IconsDemo";
import * as commonIcons from "./generated/CommonIcons";

export default {
  title: "elements/Icons",
};

export const CommonIcons = () => {
  return <IconDemoList icons={Object.values(commonIcons)} />;
};
