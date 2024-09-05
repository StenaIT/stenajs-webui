export type Placement = Side | AlignedPlacement;
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Alignment = "start" | "end";
export type Side = "top" | "right" | "bottom" | "left";
