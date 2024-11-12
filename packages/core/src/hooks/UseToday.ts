import { useMemo } from "react";

export const useToday = () => {
  return useMemo(() => new Date(), []);
};
