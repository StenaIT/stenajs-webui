export const alignmentTransformer = (
  justifyContent: string | undefined
): string | undefined => {
  switch (justifyContent?.toLowerCase()) {
    case "left":
    case "start":
    case "flex-start":
      return "text-align: left";
    case "right":
    case "end":
    case "flex-end":
      return "text-align: right";
    case "center":
      return "text-align: center";
    default:
      return undefined;
  }
};
