import * as React from "react";
import {
  FlatButton,
  FlatButtonProps,
  stenaClean,
} from "@stenajs-webui/elements";

export interface SearchFilterClearButtonProps
  extends Pick<FlatButtonProps, "label" | "onClick"> {}

export const SearchFilterClearButton: React.FC<
  SearchFilterClearButtonProps
> = ({ label = "Clear", onClick }) => {
  return <FlatButton leftIcon={stenaClean} label={label} onClick={onClick} />;
};
