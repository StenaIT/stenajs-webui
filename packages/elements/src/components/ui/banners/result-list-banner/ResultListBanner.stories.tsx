import {
  ResultListBanner,
  useResultListBannerState,
} from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Banners/ResultListBanner",
};

export const Standard = () => {
  const { bannerState } = useResultListBannerState({
    headerText: "Could not save bookings",
    items: [
      {
        text: "Booking has no route.",
      },
      {
        text: "Booking has no customer.",
        linkText: "1232",
        onClickLink: () => alert("Clicked link"),
      },
      {
        text:
          " https://agreements-api-sl-freight-core-dev.apps-internal.ocp.aws.stena.io/api/v1/AgrRoutePrice/?ids%5B0%5D=ef9a5650-cdc0-4f5a-b009-1db021ee201b&ids%5B1%5D=031635ca-76e4-4ac8-8679-227bf1b42534&ids%5B2%5D=4f8c5549-3c24-47a2-9627-34a07c832479",
        linkText: "This is a long link that must look good",
        onClickLink: () => alert("Clicked link"),
      },
    ],
  });

  if (!bannerState) {
    return null;
  }

  return <ResultListBanner variant={"error"} bannerState={bannerState} />;
};

export const WithText = () => {
  const { bannerState } = useResultListBannerState({
    headerText: "Could not save bookings",
    text: "You need to take action on these bookings.",
    items: [
      {
        text: "Booking has no route.",
      },
      {
        text: "Booking has no customer.",
        linkText: "1232",
        onClickLink: () => alert("Clicked link"),
      },
      {
        text:
          "https://agreements-api-sl-freight-core-dev.apps-internal.ocp.aws.stena.io/api/v1/AgrRoutePrice/?ids%5B0%5D=ef9a5650-cdc0-4f5a-b009-1db021ee201b&ids%5B1%5D=031635ca-76e4-4ac8-8679-227bf1b42534&ids%5B2%5D=4f8c5549-3c24-47a2-9627-34a07c832479",
        linkText: "1234",
        onClickLink: () => alert("Clicked link"),
      },
    ],
  });

  if (!bannerState) {
    return null;
  }

  return <ResultListBanner variant={"error"} bannerState={bannerState} />;
};

export const WithTextOnly = () => {
  const { bannerState } = useResultListBannerState({
    text: "You need to take action on these bookings.",
    items: [
      {
        text: "Booking has no route.",
      },
      {
        text: "Booking has no customer.",
        linkText: "1232",
        onClickLink: () => alert("Clicked link"),
      },
      {
        text:
          "https://agreements-api-sl-freight-core-dev.apps-internal.ocp.aws.stena.io/api/v1/AgrRoutePrice/?ids%5B0%5D=ef9a5650-cdc0-4f5a-b009-1db021ee201b&ids%5B1%5D=031635ca-76e4-4ac8-8679-227bf1b42534&ids%5B2%5D=4f8c5549-3c24-47a2-9627-34a07c832479",
        linkText: "1234",
        onClickLink: () => alert("Clicked link"),
      },
    ],
  });

  if (!bannerState) {
    return null;
  }

  return <ResultListBanner variant={"error"} bannerState={bannerState} />;
};
