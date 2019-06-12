import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

console.log("-------------------- useTheme init ------------------");
console.trace();
export const useTheme = () => {
  return useContext(ThemeContext);
};
