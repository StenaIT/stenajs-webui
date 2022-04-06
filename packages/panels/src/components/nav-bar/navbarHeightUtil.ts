export type NavBarVariant = "compact" | "default" | "relaxed";

const variantToHeight: Record<NavBarVariant, number> = {
  compact: 40,
  default: 48,
  relaxed: 64,
};

export const getNavbarHeight = (variant: NavBarVariant) =>
  variantToHeight[variant] + "px";
