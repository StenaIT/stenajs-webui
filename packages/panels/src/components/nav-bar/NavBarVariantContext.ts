import { createContext, useContext } from "react";
import { NavBarVariant } from "./NavBar";

export const NavBarVariantContext = createContext<NavBarVariant>("standard");

export const useNavBarVariant = () => useContext(NavBarVariantContext);
