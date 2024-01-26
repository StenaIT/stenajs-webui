import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import { ModalHeading } from "../building-blocks/ModalHeading";
import { ModalActionButtons } from "../building-blocks/ModalActionButtons";
import { MediumIcon } from "@stenajs-webui/elements";
import { CircledIcon } from "@stenajs-webui/elements";
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
