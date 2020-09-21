import * as React from "react";
import { CenterModal, CenterModalProps } from "@stenajs-webui/modal";
import { Box, Column, Indent, LargeText, Row } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon, Spinner } from "@stenajs-webui/elements";

export interface LoadingModalProps extends Omit<CenterModalProps, "isOpen"> {
  isOpen?: boolean;
  headerText?: string;
  headerIconLeft?: IconDefinition;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen = true,
  headerIconLeft,
  headerText,
  ...modalProps
}) => {
  return (
    <CenterModal {...modalProps} isOpen={isOpen}>
      <Column spacing={2}>
        <Row indent={2}>
          {headerIconLeft && (
            <>
              <Icon
                size={14}
                icon={headerIconLeft}
                color={"var(--swui-text-primary-color)"}
              />
              <Indent />
            </>
          )}
          {headerText && (
            <LargeText fontWeight={"bold"}>{headerText}</LargeText>
          )}
        </Row>
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          spacing={6}
          indent={8}
        >
          <Spinner size={"large"} />
        </Box>
      </Column>
    </CenterModal>
  );
};
