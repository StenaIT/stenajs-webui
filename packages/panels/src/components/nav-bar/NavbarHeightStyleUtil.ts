import { NavBarVariant } from "./NavBar";

const variantToHeight: Record<NavBarVariant, number> = {
  compact: 40,
  standard: 48,
  relaxed: 64,
};

export const getNavbarHeight = (variant: NavBarVariant) =>
  variantToHeight[variant] + "px";
