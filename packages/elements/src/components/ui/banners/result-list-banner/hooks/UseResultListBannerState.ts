import { useCallback, useState } from "react";
import { ResultItem } from "../../../result-list/ResultListRow";
import { ResultListBannerState } from "../ResultListBanner";

export const useResultListBannerState = (
  initialState: ResultListBannerState | undefined
) => {
  const [bannerState, setBannerState] = useState(initialState);

  const setBannerResultWithTexts = useCallback(
    (listTexts: Array<string>) => {
      setBannerState((bannerState) => ({
        ...bannerState,
        items: listTexts.map<ResultItem>((text) => ({ text })),
      }));
    },
    [setBannerState]
  );

  const setBannerResultWithErrors = useCallback(
    (errors: Array<Error>) => {
      setBannerResultWithTexts(errors.map((e) => e.message));
    },
    [setBannerResultWithTexts]
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

export type ResultListBannerStateSetter = ReturnType<
  typeof useResultListBannerState
>["setBannerState"];

export type ResultListBannerStateSetterWithTexts = ReturnType<
  typeof useResultListBannerState
>["setBannerResultWithTexts"];

export type ResultListBannerStateSetterWithErrors = ReturnType<
  typeof useResultListBannerState
>["setBannerResultWithErrors"];

export type ResultListBannerStateClearer = ReturnType<
  typeof useResultListBannerState
>["clearBannerResult"];
