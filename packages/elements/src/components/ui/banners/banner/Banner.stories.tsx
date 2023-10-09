import * as React from "react";
import { Box } from "@stenajs-webui/core";
import { Banner } from "./Banner";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { FlatButton } from "../../buttons/FlatButton";

export default {
  title: "elements/Banners/Banner",
  component: Banner,
};

export const Standard = () => (
  <Box width={"500px"}>
    <Banner headerText={"This is a single line very important message"} />
  </Box>
);

export const VariantInfo = () => (
  <Box width={"500px"}>
    <Banner
      variant={"info"}
      headerText={"This is header"}
      text={"This is something you should know."}
    />
  </Box>
);

export const VariantInfoNoHeader = () => (
  <Box width={"500px"}>
    <Banner variant={"info"} text={"This is something you should know."} />
  </Box>
);

export const VariantSuccess = () => (
  <Box width={"500px"}>
    <Banner
      variant={"success"}
      headerText={"This is header"}
      text={"This is working."}
    />
  </Box>
);

export const VariantWarning = () => (
  <Box width={"500px"}>
    <Banner
      variant={"warning"}
      headerText={"This is header"}
      text={"This is maybe working."}
    />
  </Box>
);

export const VariantError = () => (
  <Box width={"500px"}>
    <Banner
      variant={"error"}
      headerText={"This is header"}
      text={"This is not working."}
    />
  </Box>
);

export const NoHeader = () => (
  <Box width={"500px"}>
    <Banner text={"This is some text."} />
  </Box>
);

export const Loading = () => (
  <Box width={"500px"}>
    <Banner loading headerText={"This is header"} text={"Loading..."} />
  </Box>
);

export const LoadingNoHeader = () => (
  <Box width={"500px"}>
    <Banner loading text={"Loading..."} />
  </Box>
);

export const BottomContent = () => (
  <Box width={"500px"}>
    <Banner variant={"error"} headerText={"This is header"}>
      <PrimaryButton label={"Retry"} />
    </Banner>
  </Box>
);

export const BottomContentAndText = () => (
  <Box width={"500px"}>
    <Banner
      variant={"error"}
      headerText={"This is header"}
      text={"An additional text"}
    >
      <div style={{ display: "inline-block" }}>
        <PrimaryButton label={"Retry"} />
      </div>
    </Banner>
  </Box>
);

export const ContentRight = () => (
  <Box width={"500px"}>
    <Banner
      variant={"error"}
      headerText={"This is header"}
      text={"This is not working."}
      contentRight={<PrimaryButton label={"Retry"} />}
    />
  </Box>
);

export const ContentRightNoHeader = () => (
  <Box width={"500px"}>
    <Banner
      variant={"error"}
      text={"This is not working."}
      contentRight={<FlatButton label={"Retry"} />}
    />
  </Box>
);
