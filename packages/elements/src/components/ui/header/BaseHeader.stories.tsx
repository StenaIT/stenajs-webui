import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { stenaPlus, stenaSailingGate } from "../../../icons/ui/IconsUi";
import { FlatButton } from "../buttons/FlatButton";
import { Chip } from "../chip/Chip";
import { BaseHeader, HeaderVariant } from "./BaseHeader";

export default {
  title: "elements/BaseHeader",
  component: BaseHeader,
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Column height={200} width={400} shadow={"box"}>
    {children}
  </Column>
);

export const BaseHeaderVariants = () => {
  const headers: Array<HeaderVariant> = ["relaxed", "compact", "standard"];

  return (
    <Column gap={5} indent={5} spacing={5}>
      {headers.map((variant) => (
        <Container>
          <BaseHeader
            key={variant}
            text={variant.slice(0, 1).toUpperCase() + variant.slice(1)}
            variant={variant}
            leftIcon={stenaSailingGate}
            contentRight={<FlatButton rightIcon={stenaPlus} />}
            contentAfterHeading={<Chip label={"Wtf"} variant={"secondary"} />}
          />
        </Container>
      ))}
    </Column>
  );
};
