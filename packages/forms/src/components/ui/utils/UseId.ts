import { useEffect, useState } from "react";

let id = 0;
const genId = () => ++id;

export const useId = (): number => {
  const [id, setId] = useState<number | null>(null);
  useEffect(() => setId(genId()), []);
  return id!;
};
