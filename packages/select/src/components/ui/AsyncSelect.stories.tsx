import { AsyncSelect } from "./AsyncSelect";
import * as React from "react";

export default {
  title: "select/AsyncSelect",
  component: AsyncSelect,
};

export const _AsyncSelect = () => (
  <AsyncSelect
    loadOptions={getOptions}
    defaultOptions={[]}
    cacheOptions
    isSearchable
  />
);

const getOptions = (): Promise<Array<{ value: string; label: string }>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: "Mattias",
          label: "Mattias",
        },
        {
          value: "Johan",
          label: "Johan",
        },
        {
          value: "Dennis the menace",
          label: "Dennis the menace",
        },
      ]);
    }, 1500);
  });
