import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import { ModalHeading } from "./parts/ModalHeading";
import { ModalActionButtons } from "./parts/ModalActionButtons";
import { MediumIcon } from "../../../icons/IconSizes";
import { CircledIcon } from "../icon/CircledIcon";
import { ModalBody } from "./parts/ModalBody";

export interface AlertInfoModalProps extends PropsWithChildren {
  heading: string;
  text?: string;
  buttons?: ReactNode;
  icon?: MediumIcon;
  onRequestClose?: () => void;
  maxWidth?: string;
}

export const InfoAlert: React.FC<AlertInfoModalProps> = ({
  icon,
  buttons,
  heading,
  text,
  children,
  maxWidth,
}) => {
  return (
    <ModalBody
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={maxWidth}
    >
      {icon && <CircledIcon icon={icon} size={"large"} />}
      <ModalHeading>{heading}</ModalHeading>
      {text && <Text textAlign={"center"}>{text}</Text>}
      {children}
      {buttons && (
        <>
          <Box width={"100%"}>
            <Spacing />
            <ModalActionButtons buttons={buttons} />
          </Box>
        </>
      )}
    </ModalBody>
  );
};
