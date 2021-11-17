import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Box,
  Column,
  Heading,
  Indent,
  Row,
  Spacing,
} from "@stenajs-webui/core";
import { Icon, Spinner } from "@stenajs-webui/elements";
import * as React from "react";
import ReactModal from "react-modal";
import styles from "./LoadingModal.module.css";

export interface LoadingModalProps extends Omit<ReactModal.Props, "isOpen"> {
  headerText?: string;
  headerIconLeft?: IconDefinition;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  headerIconLeft,
  headerText,
  ...modalProps
}) => {
  return (
    <ReactModal
      {...modalProps}
      isOpen
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <Column spacing={2} alignItems={"center"}>
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          width={"64px"}
          height={"64px"}
          borderRadius={"50%"}
          background={"white"}
          shadow={"modal"}
        >
          <Spinner size={"small"} />
        </Box>
        {(headerIconLeft || headerText) && (
          <>
            <Spacing />
            <Row indent={2}>
              {headerIconLeft && (
                <>
                  <Icon size={14} icon={headerIconLeft} color={"white"} />
                  <Indent />
                </>
              )}
              {headerText && (
                <Heading variant={"h4"} color={"white"}>
                  {headerText}
                </Heading>
              )}
            </Row>
          </>
        )}
      </Column>
    </ReactModal>
  );
};
