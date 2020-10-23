export const getButtonLabel = (
  label: string | undefined,
  success: boolean,
  successLabel: string | undefined,
  loading: boolean,
  loadingLabel: string | undefined
): string | undefined => {
  if (success) {
    return successLabel;
  } else if (loading) {
    return loadingLabel;
  } else {
    return label;
  }
};
