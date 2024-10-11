import { useCallback, useState } from "react";
import { ResultItem } from "../../../result-list/ResultListRow";
import { ResultListBannerState } from "../ResultListBanner";

export interface UseResultListBannerStateResult {
  bannerState: ResultListBannerState | undefined;
  setBannerState: (bannerState: ResultListBannerState | undefined) => void;
  setBannerResultWithTexts: (listTexts: Array<string>) => void;
  setBannerResultWithErrors: (errors: Array<Error>) => void;
  clearBannerResult: () => void;
}

export const useResultListBannerState = (
  initialState?: ResultListBannerState | undefined,
): UseResultListBannerStateResult => {
  const [bannerState, setBannerState] = useState(initialState);

  const setBannerResultWithTexts = useCallback(
    (listTexts: Array<string>) => {
      setBannerState((bannerState) => ({
        ...bannerState,
        items: listTexts.map<ResultItem>((text) => ({ text })),
      }));
    },
    [setBannerState],
  );

  const setBannerResultWithErrors = useCallback(
    (errors: Array<Error>) => {
      setBannerResultWithTexts(errors.map((e) => e.message));
    },
    [setBannerResultWithTexts],
  );

  const clearBannerResult = useCallback(() => {
    setBannerState(undefined);
  }, [setBannerState]);

  return {
    bannerState,
    setBannerState,
    setBannerResultWithTexts,
    setBannerResultWithErrors,
    clearBannerResult,
  };
};
