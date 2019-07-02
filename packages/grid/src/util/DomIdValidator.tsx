export const ensureDomIdIsCorrect = (id: string): string => {
  return id.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
};
