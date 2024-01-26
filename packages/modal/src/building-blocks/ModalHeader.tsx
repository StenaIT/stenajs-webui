import * as React from "react";
import { Row } from "@stenajs-webui/core";
import { ModalHeading } from "./ModalHeading";
import { CloseButton } from "@stenajs-webui/elements";

export interface ModalHeaderProps {
  heading?: string;
  onClickClose?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  heading,
  onClickClose,
}) => {
  return (
    <Row justifyContent={"space-between"}>
      {heading && <ModalHeading>{heading}</ModalHeading>}
      <CloseButton onClick={onClickClose} />
    </Row>
  );
};
