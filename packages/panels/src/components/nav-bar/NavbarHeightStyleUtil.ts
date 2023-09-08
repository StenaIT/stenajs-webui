import { NavBarVariant } from "./NavBar";

const variantToHeight: Record<NavBarVariant, number> = {
  compact: 32,
  standard: 40,
  relaxed: 64,
};

export const getNavbarHeight = (variant: NavBarVariant) =>
  variantToHeight[variant] + "px";
