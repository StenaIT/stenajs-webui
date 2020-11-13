import * as React from "react";
import { Banner, BannerProps } from "../banner/Banner";
import { ResultItem, ResultListRow } from "../../result-list/ResultListRow";
import { ResultList } from "../../result-list/ResultList";

export interface ResultListBannerState {
  headerText?: string;
  text?: string;
  items?: Array<ResultItem>;
}

export interface ResultListBannerProps
  extends Omit<BannerProps, "headerText" | "text"> {
  bannerState: ResultListBannerState;
}

export const ResultListBanner: React.FC<ResultListBannerProps> = ({
  bannerState,
  ...bannerProps
}) => {
  return (
    <Banner
      {...bannerProps}
      headerText={bannerState.headerText}
      text={bannerState.text}
    >
      {bannerState.items && (
        <>
          <ResultList>
            {bannerState.items.map((item, index) => (
              <ResultListRow
                text={item.text}
                linkText={item.linkText}
                onClickLink={item.onClickLink}
                key={`ResultListBannerRow:${index}`}
              />
            ))}
          </ResultList>
        </>
      )}
    </Banner>
  );
};
