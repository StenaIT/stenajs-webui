import * as React from "react";
import { HeadingVariant, Row } from "@stenajs-webui/core";
import { ModalHeading, ModalHeadingSizeVariant } from "./ModalHeading";
import { CloseButton } from "@stenajs-webui/elements";

export interface ModalHeaderProps {
  heading?: string;
  headingSize?: ModalHeadingSizeVariant;
  headingLevel?: HeadingVariant;
  onClickClose?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  heading,
  headingLevel,
  headingSize,
  onClickClose,
}) => {
  return (
    <Row justifyContent={"space-between"}>
      {heading && (
        <ModalHeading headingLevel={headingLevel} size={headingSize}>
          {heading}
        </ModalHeading>
      )}
      <CloseButton onClick={onClickClose} />
    </Row>
  );
};
