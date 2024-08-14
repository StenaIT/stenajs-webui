import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { Text } from "@stenajs-webui/core";
import { ModalHeading } from "../building-blocks/ModalHeading";
import { ModalActionButtons } from "../building-blocks/ModalActionButtons";
import { CircledIcon, MediumIcon } from "@stenajs-webui/elements";
import { ModalBody } from "../building-blocks/ModalBody";

export interface InfoAlertProps extends PropsWithChildren {
  heading: string;
  text?: string;
  buttons?: ReactNode;
  icon?: MediumIcon;
  onRequestClose?: () => void;
  maxWidth?: string;
  minWidth?: string;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({
  icon,
  buttons,
  heading,
  text,
  children,
  maxWidth,
  minWidth,
}) => {
  return (
    <ModalBody
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={maxWidth}
      minWidth={minWidth}
    >
      {icon && <CircledIcon icon={icon} size={"large"} />}
      <ModalHeading>{heading}</ModalHeading>
      {text && <Text textAlign={"center"}>{text}</Text>}
      {children}
      {buttons && <ModalActionButtons buttons={buttons} />}
    </ModalBody>
  );
};
