import * as React from "react";
import { Box, StandardText, Row, Indent } from "@stenajs-webui/core";
import {
  Banner,
  FlatButton,
  PrimaryButton,
  Link,
} from "@stenajs-webui/elements";

export default {
  title: "elements/Banner",
};

export const Standard = () => (
  <Box width={"500px"}>
    <Banner
      headerText={"This is working."}
      text={"This is some generic information about something. Well done."}
    />
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
      <ul style={{ paddingInlineStart: "20px" }}>
        <li>
          <Row>
            <StandardText>
              This is error one, please correct problem
            </StandardText>
            <Indent />
            <Link onClick={() => alert("Link to error")}>Link to Error</Link>
          </Row>
        </li>
        <li>
          <Row>
            <StandardText>
              This is error two, please correct problem
            </StandardText>
            <Indent />
            <Link onClick={() => alert("Link to error")}>Link to Error</Link>
          </Row>
        </li>
      </ul>
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
