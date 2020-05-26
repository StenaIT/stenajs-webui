import { useEffect, useState } from "react";

let id = 0;
const genId = (componentName?: string) =>
  `webui-${componentName ? componentName + "-" : ""}${++id}`;

export const useDomId = (componentName?: string): string => {
  const [id, setId] = useState<string | null>(() => genId(componentName));
  useEffect(() => setId(genId(componentName)), [componentName]);
  return id!;
};
