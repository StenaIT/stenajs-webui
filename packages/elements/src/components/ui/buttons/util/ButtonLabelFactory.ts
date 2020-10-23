export const getButtonLabel = (
  label: string | undefined,
  success: boolean,
  successLabel: string | undefined,
  loading: boolean,
  loadingLabel: string | undefined
): string | null => {
  if (success) {
    return successLabel || null;
  } else if (loading) {
    return loadingLabel || null;
  } else {
    return label || null;
  }
};
